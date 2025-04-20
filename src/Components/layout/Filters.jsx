import React, { useState } from 'react'
import InputRange from '../UIverse/Range'
import ElasticSlider from '../Reactbits/InputRange'

const Filters = () => {
  const [minValue, setMinValue] = useState(100)
  const [maxValue, setMaxValue] = useState(1000)
  return (
    <div  className='flex  items-center mx-35 gap-x-4' >
      <ElasticSlider
      minValue={100}
      maxValue={1000}
      stepSize={1}
      defaultValue={100}
      />
    </div>
  )
}

export default Filters
