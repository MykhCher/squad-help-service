import ProgressTimer from 'react-progress-bar-timer';

const timerStyle = {
    styles: {textContainer: {
        fontSize: '0.1em',
    }},
}

function EventTimer(props) {

    const countTimerDuration = (obj) => {
        const sec = obj.eventTime;

        let dateFinish, dateStart;
        if (typeof sec === 'string') {
            dateFinish = new Date(sec).getTime();
            dateStart = new Date(obj.createdAt).getTime();
        } else {
            dateFinish = sec?.getTime() ?? new Date(Date.now()).getTime();
            dateStart = new Date(Date.now()).getTime();
        }

        const result = Math.floor((dateFinish-dateStart)/1000);

        return result;
    }

    return <ProgressTimer 
        label={props.title || 'My Event'} 
        duration={countTimerDuration(props) || 30} 
        color='#000'
        classes={timerStyle}
    />
}

export default EventTimer;