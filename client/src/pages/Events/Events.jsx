import { useState } from 'react';
// =====
import EventTimer from '../../components/EventTimer/EventTimer';

function Events() {

    const [filled, setFilled] = useState(0);

    return (
        <>
            <EventTimer />
            <button onClick={() => setFilled(filled+1)}>Count is {filled}</button>
        </>
    );
}

export default Events;