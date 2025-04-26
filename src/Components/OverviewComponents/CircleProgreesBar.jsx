import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

const CircleProgreesBar = () => {
    const percentage = 66
  return (
    <div  className='w-80 h-80'>
      <CircularProgressbar  value={percentage} text={`${percentage}%`} />
    </div>
  )
}

export default CircleProgreesBar
