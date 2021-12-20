import './style.css'

export default function Loading(props) {


    if(props.big) {

        return (
            <div className="spinner big"></div>
        )
    }

    return (
        <div className="spinner"></div>
    )
}