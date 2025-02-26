import React from 'react'
import { theme } from '../theme/theme.js'
import InteractiveHoverButtonDemo from "../comman/InteractiveHover.jsx"
import { ShinyButtonDemo } from '../comman/ShinnyButton.jsx'
const Header = () => {
  return (
    <div className={`w-full p-5 py-5 justify-between  items-center  flex  `}
    // style={{backgroundColor : theme.colors.background.lightAlt}}  
    >
      <div className='mx-8' style={{color :theme.colors.primary}} >
        <h1  className='text-2xl font-bold' >MoneyMetrics</h1>
      </div>
      <div className='flex gap-x-5 mx-4'  >

        {/* <button>Sign Up</button> */}
        <InteractiveHoverButtonDemo Name={'Sign Up'} />
        <ShinyButtonDemo Name={'Login'} />
      </div>
    </div>
  )
}

export default Header
