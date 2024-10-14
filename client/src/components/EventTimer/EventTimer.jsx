import { useState, useEffect } from "react";
import { Line } from 'rc-progress';

function EventTimer(props) {

    const processTime = (time) => {
        let sec = new Date(time).getSeconds();
        let min = new Date(time).getMinutes();
        sec = sec < 10 ? `0${sec}` : sec; 
        min = min < 10 ? `0${min}` : min; 
        const hours = Math.round(time / (1000*60*60));
        return `${hours}h ${min}m ${sec}s`;
    }

    const useTimeProgress = (startDate, endDate) => {
        const [progress, setProgress] = useState(0);
        const [totalDuration, setTotalDuration] = useState(endDate - startDate);
        const [elapsedTime, setElapsedTime] = useState(new Date() - startDate);
    
        useEffect(() => {
            const updateProgress = () => {
                const now = new Date();
                setTotalDuration(endDate - startDate);
                setElapsedTime(now - startDate);
                const percentage = Math.min((elapsedTime / totalDuration) * 100, 100);
                
                setProgress(percentage);
            };
        
            const intervalId = setInterval(updateProgress, 1000);
        
            updateProgress();
        
            return () => clearInterval(intervalId);
        }, [totalDuration, elapsedTime]);
    

        return [progress, elapsedTime, totalDuration];
    };

    const DbStartDate = new Date(props.createdAt).getTime();
    const DbFinishDate = new Date(props.eventTime).getTime();
    const [ progress, currentTime, finishTime ] = useTimeProgress(DbStartDate, DbFinishDate);



    return (
        <>
            <label htmlFor={props.title}>
                {processTime(currentTime)} / {processTime(finishTime)} 
                <span style={{color: 'red', cursor: 'pointer'}}>X</span>
                <span style={{color: 'green', cursor: 'pointer'}}>&#10003;</span>
            </label>
            <Line id={props.title} percent={progress}/>
        </>
    )
}

export default EventTimer;