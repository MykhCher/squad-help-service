import { useRef, useState } from 'react';
// =====
import EventTimer from '../../components/EventTimer/EventTimer';
import EventForm from '../../components/EventForm/EventForm';

function Events() {

    const [ timers, setTimers ] = useState([]);
    const formRef = useRef();

    const handleFormSubmit = values => {
        setTimers([...timers, values])
    }

    return (
        <>
            <div style={{textAlign: 'center'}}>
                <EventForm 
                    formRef={formRef}
                    handleSubmit={handleFormSubmit}
                />
                <ul>
                    {timers.map(timer => {
                        return (<li key={timer}>
                            <EventTimer {...timer} />
                        </li>)
                    })}
                </ul>
            </div>
        </>
    );
}

export default Events;