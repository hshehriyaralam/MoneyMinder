import React, { useState } from 'react'
import { Image } from 'antd'

const HeaderLeftBtns = () => {
    const [picture,setPicture] = useState('')
  return (
    <div className='flex gap-x-2'>
       {picture && picture.trim() !== '' ? (
        <Image
        src={picture}
        alt="Profile"
        className="w-full h-full object-cover object-top"
        />
    ) : (
        <User className="w-16 h-16 text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    )}
    <button>Logout</button>
    </div>
  )
}

export default HeaderLeftBtns
