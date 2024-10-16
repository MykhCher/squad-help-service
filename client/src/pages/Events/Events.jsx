import { useEffect, useRef, useState } from 'react';
// =====
import { getEvents, createEvent, deleteEvent } from '../../api/rest/restController';
import EventTimer from '../../components/EventTimer/EventTimer';
import EventForm from '../../components/EventForm/EventForm';
// =====
import styles from './Events.module.sass';

function Events() {

    const [ timers, setTimers ] = useState([]);
    const formRef = useRef();

    const setSortedTimers = (arr) => {
        const newTimers = arr.sort((a, b) => new Date(a.eventTime).getTime()-new Date(b.eventTime).getTime());
        setTimers(newTimers);
    } 

    useEffect(() => {
        getEvents()
            .then(({ data }) => setSortedTimers(data))
            .catch(err => console.log('Error: ', err));
    }, [])

    const handleFormSubmit = values => {
        createEvent(values)
            .then(({ data }) => {
                setSortedTimers([...timers, data]);
            })
            .catch(err => console.log(err));
    }

    const handleDelete = id => {
        const newTimers = timers.filter(timer => timer.id !== id);
        setSortedTimers(newTimers);
        
        deleteEvent({id});
    }

    return (
        <>
            <h1>Events</h1>
            <div className={styles.mainContainer}>
                <div className={styles.timersContainer}>
                    <ul>
                        {timers.map(timer => (<li key={timer.id}>
                            <EventTimer {...timer} deleteEvent={handleDelete} />
                        </li>))}
                    </ul>
                </div>
                <div className={styles.formContainer}>
                    <EventForm 
                        formRef={formRef}
                        handleSubmit={handleFormSubmit}
                    />
                </div>
            </div>
        </>
    );
}

export default Events;