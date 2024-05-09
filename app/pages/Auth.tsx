'use client'

import Image from 'next/image'

import React, { useState } from 'react'
import { Unbounded } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation'

const unbounded = Unbounded({ subsets: ["latin"] });


const Auth = (params: {type: string}) => {

  const router = useRouter();
  const authType = params.type;

  const [passwordShowed, setPasswordShowed] = useState({
    password: false,
    confirmPassword: false
  });
  const [register, setRegister] = useState(authType === 'signup');
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formDatas, setFormDatas] = useState({
    email: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    password: '',
    confirmPassword: '',
  });

  const changeMode = () => {
    setLoadingRegister(true);
    setTimeout(() => {
      setRegister(!register);
      setPasswordShowed({ password: false, confirmPassword: false });
      setLoadingRegister(false);
      router.push("/authentication/" + (register ? 'login' : 'signup'));
    }, 200)
  }

  const login = () => {
    
  }

  const signup = () => {
    
  }

  return (
     <main className={`flex flex-col justify-center gap-12 min-h-[100svh]`}>
      <div className='flex flex-col items-center'>
        <Image
          src="/assets/logopng.png"
          alt="logo"
          width={200}
          height={200}
          className={`transition-all duration-200 ease-in absolute top-12 ${register ? 'w-[80px]' : 'w-[150px]'}`}
        />
        <h1 className={`${unbounded.className} text-4xl font-bold mt-[5rem] logo-text-auth`}>Paillasson</h1>
      </div>
      <form action="#" className="flex flex-col items-center mx-auto mb-0 mt-6 max-w-md space-y-4 px-8 text-black">

        { register &&
          <div className='flex w-12/12 gap-4'>

              <label htmlFor="name" className="sr-only">Nom</label>
              <div className="relative">
                <input
                  type="text"
                  value={formDatas.lastName}
                  onChange={(e) => setFormDatas({ ...formDatas, lastName: e.target.value })}
                  className="w-[100%] rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="Nom..."
                />
              </div>
            

              <label htmlFor="firstname" className="sr-only">Prénom</label>
              <div className="relative">
                <input
                  type="text"
                  value={formDatas.firstName}
                  onChange={(e) => setFormDatas({ ...formDatas, firstName: e.target.value })}
                  className="w-[100%] rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="Prénom..."
                />
              </div>
          </div>
        }

        <div className='w-full'>
          <label htmlFor="email" className="sr-only">E-mail</label>

          <div className="relative">
            <input
              type="email"
              value={formDatas.email}
              onChange={(e) => setFormDatas({ ...formDatas, email: e.target.value })}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Email..."
            />
          </div>
        </div>

        <div className='w-full'>
          <label htmlFor="password" className="sr-only">Mot de passe</label>
          <div className="relative">
            <input
              type={passwordShowed.password ? "text" : "password"}
              value={formDatas.password}
              onChange={(e) => setFormDatas({ ...formDatas, password: e.target.value })}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Mot de passe..."
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={() => setPasswordShowed({ ...passwordShowed, password: !passwordShowed.password})}>
              {passwordShowed.password ? <FaEye className='text-gray-400'/> : <FaEyeSlash className='text-gray-400'/>}
            </span>
          </div>
        </div>

        { register &&
          <div className='w-full'>
          <label htmlFor="passwordConfirmation" className="sr-only">Confirmation du mot de passe</label>
          <div className="relative">
            <input
              type={passwordShowed.confirmPassword ? "text" : "password"}
              value={formDatas.confirmPassword}
              onChange={(e) => setFormDatas({ ...formDatas, confirmPassword: e.target.value })}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Confirmer le mot de passe..."
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={() => setPasswordShowed({ ...passwordShowed, confirmPassword: !passwordShowed.confirmPassword})}>
              {passwordShowed.confirmPassword ? <FaEye className='text-gray-400'/> : <FaEyeSlash className='text-gray-400'/>}
            </span>
          </div>
        </div>
        }

        <div className='w-full flex justify-between items-center gap-3'>
          <div className='w-full h-[1px] bg-gray-500'></div>
          <p className='text-gray-500 text-xs'>ou</p>
          <div className='w-full h-[1px] bg-gray-500'></div>
        </div>

        <div className='flex w-[100%] gap-5 pb-4'>
          <button type="button" className='flex justify-center w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm bg-gray-200'><BiLogoFacebookSquare className='text-blue-900'/></button>
          <button type="button" className='flex justify-center w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm bg-gray-200'><FcGoogle/></button>
        </div>

        <p className={`text-sm flex items-center justify-center text-${loadingRegister ? 'gray-500' : 'gray-400'}`}>
          {register ? "Vous avez déja un compte ?" : "Vous n'avez pas de compte ?"}
          <button type='button' className={`underline ms-1 ${loadingRegister ? 'text-gray-500' : 'text-blue-400'}`} onClick={() => changeMode()}>{register ? "Se connecter" : "S'inscrire"}</button>
          {loadingRegister &&       
          <span role="status" className='absolute'>
              <svg aria-hidden="true" className="w-4 h-4 inline text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
          </span>
          }
        </p>

        <button
          type="button"
          onClick={() => register ? signup() : login()}
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-[100%]"
        >
          {register ? "S'inscrire" : "Se connecter"}
        </button>
      </form>
     </main>
  )
}

export default Auth