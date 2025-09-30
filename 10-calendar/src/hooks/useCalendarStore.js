import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  OnLoadEvents,
} from '../store';

import calendarApi, {
  EVENTS_GET_ROUTE,
  EVENTS_POST_ROUTE,
  EVENTS_DELETE_ROUTE,
  EVENTS_SCHEMA,
} from '../api/calendarApi';

import { convertEventsToDateEvents } from '../helpers';

/*Helpers de fecha */
const toISO = (d) => (d instanceof Date ? d.toISOString() : new Date(d).toISOString());
const pad2 = (n) => String(n).padStart(2, '0');
const toDatePart = (d) => {
  const x = d instanceof Date ? d : new Date(d);
  return `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`;
};
const toTimePart = (d) => {
  const x = d instanceof Date ? d : new Date(d);
  return `${pad2(x.getHours())}:${pad2(x.getMinutes())}:${pad2(x.getSeconds())}`;
};
const joinDateTime = (fecha, hora) => (fecha && hora ? `${fecha}T${hora}` : undefined);


const buildPayload = (ev, schema) => {
  const title = ev.title?.trim() ?? '';
  const notes = ev.notes?.trim() ?? '';

  switch ((schema || '').toLowerCase()) {
    case 'events':
      return { title, notes, start: toISO(ev.start), end: toISO(ev.end) };

    case 'capacitaciones':
      return {
        titulo: title,
        descripcion: notes,
        fechaInicio: toISO(ev.start),
        fechaFin: toISO(ev.end),
      };

    case 'agregarevento':
    default:
      return {
        Nombre_del_evento: title,
        Fecha: toDatePart(ev.start),
        Hora_inicio: toTimePart(ev.start),
        Hora_fin: toTimePart(ev.end),
        Descripcion: notes || undefined,
      };
  }
};

/* Para convertir lo que me devuelve mi backend*/
const normalizeFromBackend = (e) => {
  const fecha = e?.Fecha || e?.fecha;
  const horaIni = e?.Hora_inicio || e?.hora_inicio || e?.horaInicio;
  const horaFin = e?.Hora_fin || e?.hora_fin || e?.horaFin;

  const owner =
    e?.usuario ?? e?.user ?? e?.owner ?? e?.createdBy ?? e?.usuario_id ?? e?.userId;

  const user =
    typeof owner === 'object' && owner
      ? {
          _id: owner._id || owner.id || owner.uid || owner.usuario_id || owner.userId,
          name:
            owner.name ||
            owner.nombre ||
            owner.username ||
            owner.usuario ||
            'Usuario',
        }
      : owner
      ? { _id: owner, name: 'Usuario' }
      : undefined;

  return {
    id:
      e?.id ??
      e?._id ??
      e?.idEvento ??
      e?.idevento ??
      e?.id_capacitacion ??
      e?.idCapacitacion,
    title:
      e?.Nombre_del_evento ??
      e?.nombre_del_evento ??
      e?.title ??
      e?.titulo ??
      e?.nombre ??
      e?.nombreevento ??
      '',
    notes:
      e?.Descripcion ?? e?.descripcion ?? e?.notes ?? e?.description ?? e?.detalle ?? '',
    start:
      e?.start ??
      e?.fechaInicio ??
      e?.fecha_inicio ??
      e?.startDate ??
      e?.inicio ??
      joinDateTime(fecha, horaIni) ??
      fecha,
    end:
      e?.end ??
      e?.fechaFin ??
      e?.fecha_fin ??
      e?.endDate ??
      e?.fin ??
      joinDateTime(fecha, horaFin) ??
      fecha,
    user,
  };
};

/* Extracción de errores del servidor  */
const extractServerErrors = (data) => {
  try {
    if (!data) return null;
    if (typeof data === 'string') return data;

    const msgs = [];
    if (typeof data.msg === 'string') msgs.push(data.msg);
    if (typeof data.message === 'string') msgs.push(data.message);
    if (typeof data.error === 'string') msgs.push(data.error);

    if (Array.isArray(data.errors)) {
      data.errors.forEach((e) => {
        const p = e?.param || e?.field || e?.campo;
        const m = e?.msg || e?.message || e?.mensaje || e?.error;
        if (m) msgs.push(p ? `${p}: ${m}` : m);
      });
    }

    if (Array.isArray(data.Errores)) {
      data.Errores.forEach((e) => {
        const p = e?.param || e?.field || e?.campo;
        const m =
          e?.msg || e?.message || e?.mensaje || e?.error || (typeof e === 'string' ? e : null);
        if (m) msgs.push(p ? `${p}: ${m}` : m);
      });
    } else if (data.Errores && typeof data.Errores === 'object') {
      Object.entries(data.Errores).forEach(([k, v]) => {
        if (typeof v === 'string') msgs.push(`${k}: ${v}`);
        else if (v?.msg || v?.message || v?.mensaje)
          msgs.push(`${k}: ${v.msg || v.message || v.mensaje}`);
        else msgs.push(`${k}: ${JSON.stringify(v)}`);
      });
    }

    return msgs.length ? [...new Set(msgs)].join('\n') : JSON.stringify(data);
  } catch {
    return null;
  }
};

/* DELETE con fallback de rutas */
const tryDeleteWithRoutes = async (id) => {
  const unique = (arr) => [...new Set(arr.filter(Boolean))];
  const bases = unique([EVENTS_DELETE_ROUTE, EVENTS_POST_ROUTE, EVENTS_GET_ROUTE, '/events']);

  let lastErr = null;
  for (const base of bases) {
    const url = `${base}/${id}`;
    try {
      const resp = await calendarApi.delete(url);
      console.log(`[delete] OK ${url}`, resp.data);
      return resp.data;
    } catch (err) {
      lastErr = err;
      console.warn(`[delete] FAIL ${url}`, err?.response?.status, err?.response?.data);
    }
  }
  throw lastErr;
};

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const SetActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        const payload = buildPayload(calendarEvent, EVENTS_SCHEMA);
        const { data } = await calendarApi.put(
          `${EVENTS_GET_ROUTE}/${calendarEvent.id}`,
          payload,
          { headers: { 'Content-Type': 'application/json' } }
        );
        const updatedServer = data?.evento ?? data?.event ?? data ?? {};
        dispatch(
          onUpdateEvent({
            ...calendarEvent,
            ...normalizeFromBackend(updatedServer),
            user,
          })
        );
        return;
      }

      const payload = buildPayload(calendarEvent, EVENTS_SCHEMA);
      console.log(`[create] payload=`, payload);
      const { data } = await calendarApi.post(EVENTS_POST_ROUTE, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const created = data?.evento ?? data?.event ?? data ?? {};
      const normalized = normalizeFromBackend(created);
      const newId = normalized.id ?? created?.id ?? created?._id ?? String(Date.now());

      dispatch(onAddNewEvent({ ...calendarEvent, id: newId, user }));
    } catch (error) {
      console.error('[startSavingEvent] error:', error);
      const serverMsg =
        extractServerErrors(error?.response?.data) ||
        error?.message ||
        'No se pudo guardar (400/500). Revisa payload/ruta.';
      Swal.fire('Error al guardar', serverMsg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try {
      if (!activeEvent?.id) {
        Swal.fire('Sin selección', 'No hay un evento seleccionado.', 'info');
        return;
      }
      await tryDeleteWithRoutes(activeEvent.id);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.error('[startDeletingEvent] error:', error);
      const serverMsg =
        extractServerErrors(error?.response?.data) || 'No se pudo eliminar.';
      Swal.fire('Error al eliminar', serverMsg, 'error');
    }
  };

  const starLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get(EVENTS_GET_ROUTE);
      const raw =
        data?.eventos ??
        data?.capacitaciones ??
        data?.events ??
        (Array.isArray(data) ? data : []);

      const normalized = (Array.isArray(raw) ? raw : []).map(normalizeFromBackend);
      const events = convertEventsToDateEvents(normalized);

      dispatch(OnLoadEvents(events));
    } catch (error) {
      console.error('[starLoadingEvents] error:', error);
      Swal.fire('Error', 'No se pudieron cargar los eventos.', 'error');
    }
  };

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    startDeletingEvent,
    SetActiveEvent,
    startSavingEvent,
    starLoadingEvents,
  };
};
