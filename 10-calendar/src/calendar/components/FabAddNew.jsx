import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";


export const FabAddNew = () => {

    const {openDateModal} = useUiStore();
    const { SetActiveEvent } = useCalendarStore();

    const handClickNew = () => {
        SetActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id:'123',
                name: 'Helen'
            }
        });
        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ handClickNew }
    >
        <i className="fas fa-plus"></i>

    </button>
  )
}
