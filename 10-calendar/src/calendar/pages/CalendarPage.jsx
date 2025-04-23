import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import { Views } from 'react-big-calendar';



import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';


//Se agregó el div para el ancho de la pantalla del calendario 

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, SetActiveEvent } = useCalendarStore();
  const [ lastView, setlastView ] = useState(localStorage.getItem('lastView') || 'month')

const eventStyleGetter = ( event, start, end, isSelected ) => {

  const style = {
    backgroundColor: '#347CF7',
    borderRadius: '0px',
    opacity: 0.8,
    color: 'white'
  }

  return {
    style
  }

}

const onDoubleClick = ( event ) => {
  //console.log({ doubleClick: event });
  openDateModal();
}

const onSelect = ( event ) => {
  //console.log({ click: event });
  SetActiveEvent( event );

}

const onViewChanged = ( event ) => {
  localStorage.setItem('lastView', event);
  setlastView( event )
}


  return (
    <>
      <Navbar />
      
      <div style={{ paddingTop: '10px', width: '100vw', paddingLeft: '20px', paddingRight: '20px' }}> 

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        //style={{ height: 'calc(100vh-80px)' }} //REAL
        style={{ height: 'calc(100vh - 100px)'}} //Modificada para que tenga la altura se adapte
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />



      </div>
    </>
  )

}
