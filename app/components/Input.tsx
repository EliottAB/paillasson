'use client'

import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Input = ({type, inputName, placeholder}: {type: 'text' | 'password' | 'email', inputName: string, placeholder: string}) => {

  const [passwordShowed, setPasswordShowed] = useState(false)

  return (
    <div className="relative">
      <input
        type={passwordShowed ? 'text' : type}
        name={inputName}
        className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm"
        placeholder={placeholder}
      />

      { type === 'password' &&
      <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={() => setPasswordShowed(!passwordShowed)}>
        {passwordShowed ? <FaEye className='text-gray-400'/> : <FaEyeSlash className='text-gray-400'/>}
      </span>
      }
    </div>
  )
}

export default Input
