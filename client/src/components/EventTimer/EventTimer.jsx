import ProgressTimer from 'react-progress-bar-timer';

const timerStyle = {
    styles: {textContainer: {
        fontSize: '0.1em',
    }},
}

function EventTimer() {
    return <ProgressTimer 
        label="Something" 
        duration={30} 
        color='#6dcf7a'
        classes={timerStyle}
    />
}

export default EventTimer;