// src/mantenimiento/pages/MantenimientoPage.jsx
import { useEffect, useState } from 'react';
import { SidebarLayout } from '../../layouts/SidebarLayout';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarModal, FabAddNew, FabDelete, CalendarEvent, Navbar } from '../../calendar';
import { getMessagesES, localizer } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const MantenimientoPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, SetActiveEvent, starLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    starLoadingEvents();
  }, [starLoadingEvents]);

  const eventStyleGetter = (event) => {
    const isMyEvent =
      user.uid === event.user?._id || user.uid === event.user?.uid;

    return {
      style: {
        backgroundColor: isMyEvent ? '#28a745' : '#6c757d',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
      },
    };
  };

  const onDoubleClick = () => openDateModal();
  const onSelect = (event) => SetActiveEvent(event);
  const onViewChanged = (view) => {
    localStorage.setItem('lastView', view);
    setLastView(view);
  };

  return (
    <SidebarLayout>
      <Navbar />

      {/* 220px (sidebar) + 20px padding = 240px */}
      <div
        className="calendar-pane"
        style={{
          padding: '70px 20px 10px',
          width: 'calc(100vw - 240px)',
          maxWidth: '100%',
        }}
      >
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 100px)', width: '100%' }}
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
