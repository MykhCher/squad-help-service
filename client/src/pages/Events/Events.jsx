import { useState } from 'react';
// =====
import EventTimer from '../../components/EventTimer/EventTimer';
import EventForm from '../../components/EventForm/EventForm';

function Events() {

    const [filled, setFilled] = useState(0);

    return (
        <>
            <div style={{textAlign: 'center'}}>
                <EventTimer />
                <button onClick={() => setFilled(filled+1)}>Count is {filled}</button>
                <EventForm />
            </div>
        </>
    );
}

export default Events;