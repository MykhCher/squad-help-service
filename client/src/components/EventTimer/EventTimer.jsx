import ProgressTimer from 'react-progress-bar-timer';

const timerStyle = {
    styles: {textContainer: {
        fontSize: '0.1em',
    }},
}

function EventTimer(props) {

    const countTimerDuration = (sec) => {
        const dateStart = new Date(Date.now()).getTime();
        const dateFinish = sec?.getTime() ?? new Date(Date.now()).getTime();

        const result = Math.floor((dateFinish-dateStart)/1000);

        return result;
    }

    return <ProgressTimer 
        label={props.title || 'My Event'} 
        duration={countTimerDuration(props.eventTime) || 30} 
        color='#000'
        classes={timerStyle}
    />
}

export default EventTimer;