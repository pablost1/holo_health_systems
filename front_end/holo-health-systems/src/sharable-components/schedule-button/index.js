import './style.css'


export default function ScheduleButton(props) {


    function ExecuteAction(e) {
        if(props.onClick) {
            e.preventDefault()
            props.onClick()
        }
    }


    return (
        <button onClick={ExecuteAction} className="schedule-button">
            { props.children }
        </button>
    )




}