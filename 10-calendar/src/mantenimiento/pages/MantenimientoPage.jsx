// src/capacitacion/pages/CapacitacionPage.jsx
import { SidebarLayout } from '../../layouts/SidebarLayout';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarModal, FabAddNew, FabDelete, CalendarEvent, Navbar } from '../../calendar';
import { getMessagesES, localizer } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { useEffect, useState } from 'react';

export const MantenimientoPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, SetActiveEvent, starLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    starLoadingEvents();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    return {
      style: {
        backgroundColor: isMyEvent ? '#28a745' : '#6c757d',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
      }
    };
  };

  const onDoubleClick = () => openDateModal();
  const onSelect = (event) => SetActiveEvent(event);
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  return (
    <SidebarLayout>
      <Navbar />

      <div style={{ padding: '10px 20px', width: '100%' }}>
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 100px)' }}
          messages={getMessagesES()}
          eventPropGetter={eventStyleGetter}
          components={{ event: CalendarEvent }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
        />

        <CalendarModal />
        <FabAddNew />
        <FabDelete />
      </div>
    </SidebarLayout>
  );
};
