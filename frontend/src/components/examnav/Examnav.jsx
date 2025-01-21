import React from 'react'
import Button from '../Button'
import Timer from './Timer'


function Examnav() {

  const time = new Date();
  time.setSeconds(time.getSeconds() + 15);

  return (
    <div className='flex justify-between items-center h-full'>
      <Button label='CST-303 Operating system' buttonClass={' text-orange-500 hover:text-orange-400 bg-orangeButton'}/>

      <div className="flex-grow flex justify-center mx-auto">
        <Timer expiryTimestamp={time} onExpireCallback={()=>{console.log('done')}} timeStart={true} />
      </div>
     
      <Button label='finish exam' buttonClass={' text-white w-[150px] hover:text-red-400 bg-red-900'}/>

    </div>
  )
}

export default Examnav