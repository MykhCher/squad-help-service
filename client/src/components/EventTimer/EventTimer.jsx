import { Line } from 'rc-progress';
// =====
import useTimeProgress from "../../hooks/useTimeProgress";
// =====
import styles from './EventTimer.module.sass';


function EventTimer(props) {

    const processTime = (time) => {
        let sec = new Date(time).getSeconds();
        let min = new Date(time).getMinutes();
        const hours = Math.floor(time / (1000*60*60));
        return `${hours ? `${hours}h` : ''} ${min ? `${min}m` : ''} ${sec}s`;
    }

    const DbStartDate = new Date(props.createdAt).getTime();
    const DbFinishDate = new Date(props.eventTime).getTime();
    const [ progress ] = useTimeProgress(DbStartDate, DbFinishDate);

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timerLabel}>
                <div>
                    {props.title}
                </div>
                <div>
                    {progress !== 100 ? processTime(DbFinishDate - new Date()) : 'Timer\'s done!'} 
                    <span 
                        style={progress !== 100 
                            ? {
                                color: 'red',
                                padding: '0 6px'
                            }
                            : {
                                color: 'green'
                            }} 
                        onClick={() => {props.deleteEvent(props.id)}}
                    >
                        {progress !== 100 ? 'x' : '✓'}
                    </span>
                </div>
            </div>
            <Line 
                strokeColor='#3de369' 
                trailColor="#cadbce" 
                id={props.id} 
                percent={progress}
            />
        </div>
    )
}

export default EventTimer;