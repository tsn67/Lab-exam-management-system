import React from 'react'
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Clock } from "lucide-react";

function Timer({expiryTimestamp, onExpireCallback, timeStart}) {
    const {
        seconds,
        minutes,
        hours,
        isRunning, 
        start,
        pause,
        resume,
        restart,
        expired,
      } = useTimer({ expiryTimestamp ,
        onExpire: onExpireCallback,
        autoStart: false,
      });
    

      useEffect(() => {
        if (timeStart) {start()}
        else{pause()}
        
      }, [timeStart, start, pause]);


      return (
        <div>
          <p className='text-white bg-darkGray rounded-md px-2 py-1 flex gap-2 items-center'>
            <Clock className="w-4 h-4 text-green" />
            {hours}h {minutes}m {seconds}s
          </p>
        </div>
      );
    
}

export default Timer