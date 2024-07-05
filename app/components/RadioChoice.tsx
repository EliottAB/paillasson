import React from 'react'

const RadioChoice = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="flex justify-center w-full gap-4 mt-8 px-12">
      {children}
    </div>
  )
}

export default RadioChoice
