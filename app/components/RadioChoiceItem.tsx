import React from 'react'
import { TbTriangleInvertedFilled } from 'react-icons/tb'

const RadioChoiceItem = ({children, inputName, inputValue, setState}: {children: React.ReactNode, inputName: string, inputValue: string, setState: (value: string) => void}) => {
  return (
    <div className="transition relative flex flex-col justify-center border-blue-500 text-blue-500 border-4 w-full max-w-[20rem] h-[6rem] rounded-lg privacy-choice">
      <label htmlFor={inputValue} className="flex flex-col items-center w-full h-full justify-center">
        {children}
        <span className="text-sm">Ouvert</span>
        <TbTriangleInvertedFilled className="absolute -top-2 text-white icon-border"/>
      </label>
      <input type="radio" name={inputName} id={inputValue} value={inputValue} className="hidden" onChange={() => setState(inputValue)}/>
    </div>
  )
}

export default RadioChoiceItem
