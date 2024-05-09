'use client'

import React from 'react'
import Auth from '../pages/Auth'
import { usePathname } from 'next/navigation'

const Authentication = () => {
  const pathName = usePathname();

  let type = 'login';
  if (pathName === '/authentication/signup') type = 'signup';
  return (
    <Auth type={type}/>
  )
}

export default Authentication
