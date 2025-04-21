import React, { useContext, useState } from 'react'
import ElasticSlider from '../Reactbits/InputRange'
import { Context } from '@/Context/TransactionContext'

const Filters = ({onSelectValue}) => {
  const [selectValue, setSelectValue] = useState(100)
  const {maxValue,minValue} = useContext(Context)

  const handleSliderChange = (value) => {
    setSelectValue(value)
    onSelectValue(value)
  }

  
  return (
    <div  className='flex  items-center mx-35 gap-x-4' >
      <ElasticSlider
      minValue={`${minValue}`}
      maxValue={`${maxValue}`}
      stepSize={10}
      defaultValue={`${minValue}`}
      onChange={handleSliderChange}
      />
    </div>
  )
}

export default Filters