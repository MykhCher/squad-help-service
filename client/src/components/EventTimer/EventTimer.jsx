import { useState, useEffect } from "react";
import { Line } from 'rc-progress';

function EventTimer(props) {

    const processTime = (time) => {
        let sec = new Date(time).getSeconds();
        let min = new Date(time).getMinutes();
        const hours = Math.floor(time / (1000*60*60));
        return `${hours ? `${hours}h` : ''} ${min ? `${min}m` : ''} ${sec}s`;
    }

    const useTimeProgress = (startDate, endDate) => {
        const [progress, setProgress] = useState(0);
        const [totalDuration, setTotalDuration] = useState(endDate - startDate);
        const [elapsedTime, setElapsedTime] = useState(new Date() - startDate);
    
        useEffect(() => {
            const updateProgress = () => {
                if (progress === 100) {
                    clearInterval(intervalId);
                } else {
                    const now = new Date();
                    setTotalDuration(endDate - startDate);
                    setElapsedTime(now - startDate);
                    const percentage = Math.min((elapsedTime / totalDuration) * 100, 100);
                    
                    setProgress(percentage);
                }
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
            <label htmlFor={props.id}>
                {progress !== 100 ? processTime(finishTime - currentTime) : 'Timer\'s done!'} 
                <span 
                    style={{color: progress !== 100 ? 'red' : 'green', cursor: 'pointer'}} 
                    onClick={() => {props.deleteEvent(props.id)}}
                >
                    {progress !== 100 ? 'X' : '✓'}
                </span>
            </label>
            <Line 
                strokeColor='#3de369' 
                trailColor="#cadbce" 
                id={props.id} 
                percent={progress}
            />
        </>
    )
}

export default EventTimer;