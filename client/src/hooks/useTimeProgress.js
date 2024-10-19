import { useEffect, useState } from "react";

export default (startDate, endDate) => {
    const [progress, setProgress] = useState(0);
    const totalDuration = endDate - startDate;

    useEffect(() => {
        const updateProgress = () => {
            if (progress === 100) {
                clearInterval(intervalId);
            } else {
                const percentage = Math.min(((new Date() - startDate) / totalDuration) * 100, 100);
                
                setProgress(percentage);
            }
        };
    
        const intervalId = setInterval(updateProgress, 1000);
    
        updateProgress();
    
        return () => clearInterval(intervalId);
    }, []);    

    return [progress];
};