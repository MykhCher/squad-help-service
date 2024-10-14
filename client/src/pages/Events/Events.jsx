import { useEffect, useRef, useState } from 'react';
// =====
import { getEvents, createEvent } from '../../api/rest/restController';
import EventTimer from '../../components/EventTimer/EventTimer';
import EventForm from '../../components/EventForm/EventForm';

function Events() {

    const [ timers, setTimers ] = useState([]);
    const formRef = useRef();

    useEffect(() => {
        getEvents()
            .then(({ data }) => setTimers(data))
            .catch(err => console.log('Error: ', err));
    }, [])

    const handleFormSubmit = values => {
        createEvent(values)
            .then(({ data }) => {
                setTimers([...timers, data]);
            })
            .catch(err => console.log(err));
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
                        return (<li key={timer.title}>
                            <EventTimer {...timer} />
                        </li>)
                    })}
                </ul>
            </div>
        </>
    );
}

export default Events;