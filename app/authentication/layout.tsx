'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Unbounded } from 'next/font/google'
import { FcGoogle } from 'react-icons/fc'
import { BiLogoFacebookSquare } from 'react-icons/bi'
import { createClient } from '@supabase/supabase-js'
import BadgeText from '../components/utils/BadgeText'
import Input from '../components/Input'
import PopupConfirm from '../components/utils/PopupConfirm'

const unbounded = Unbounded({ subsets: ["latin"], weight: "400" });

const Authentication = () => {
  
  const router = useRouter();
  const pathName = usePathname();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  let authType = 'login';
  if (pathName === '/authentication/signup') authType = 'signup';

  const [register, setRegister] = useState(authType === 'signup');
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorInputs, setErrorInputs] = useState('');
  const [errorBlink, setErrorBlink] = useState(false);
  const [registerResponse, setRegisterResponse] = useState('');
  const [modaleShowed, setModaleShowed] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const changeMode = () => {
    setRegister(!register);
    setErrorInputs('');
    router.push("/authentication/" + (register ? 'login' : 'signup'));
  }

  function displayInputError(text: string){
    const blinkDuration = 450;
    setErrorInputs(text);
    setErrorBlink(true);
    setLoadingSubmit(false);
    setTimeout(() => {
      setErrorBlink(false);
    }, blinkDuration);
  }

  const googleSignIn = async () => {
    setLoadingSubmit(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) displayInputError(error.message);
    setLoadingSubmit(false);
  }

  const login = async (formDatas: FormData) => {

    const datas = {
      email: formDatas.get('email') as string,
      password: formDatas.get('password') as string,
    }

    if (!datas.email || !datas.password) {
      displayInputError('Veuillez remplir tous les champs');
      return;
    }

    if (!emailRegex.test(datas.email)) {
      displayInputError('Adresse mail invalide');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: datas.email as string,
      password: datas.password as string,
    })

    if (error?.message == 'Invalid login credentials') {
      displayInputError('Email ou mot de passe incorrect');
      return;
    }
    if(error?.message == 'Email not confirmed'){
      displayInputError('Vous devez confirmer votre adresse mail');
      return;
    }

    if(error){
      displayInputError(error.message);
      return;
    }
    router.push("/");
  }

  const signup = async (formDatas: FormData) => {

    const datas = {
      firstName: formDatas.get('firstname') as string,
      lastname: formDatas.get('lastname') as string,
      email: formDatas.get('email') as string,
      password: formDatas.get('password') as string,
      confirmPassword: formDatas.get('confirmPassword') as string,
    }

    if(!datas.firstName || !datas.lastname || !datas.email || !datas.password || !datas.confirmPassword){
      displayInputError('Veuillez remplir tous les champs.');
      return;
    }
    
    if(datas.firstName?.length < 3 || datas.lastname?.length < 3){
      displayInputError('Le nom et le prénom doivent \ncontenir au moins 3 caractères.');
      return;
    }

    if (!emailRegex.test(datas.email)) {
      displayInputError('Adresse mail invalide');
      return;
    }

    const hasNumber = /[0-9]/.test(datas.password);
    if(datas.password.length < 8 || !hasNumber){
      displayInputError('Le mot de passe doit contenir \nau moins 8 caractères dont un chiffre.');
      return;
    }
  
    if(datas.confirmPassword !== datas.password){
      displayInputError('Le mot de passe et sa confirmation \nne sont pas identiques.');
      return;
    }

    const { data, error } = await supabase.auth.signUp(
      {
        email: datas.email,
        password: datas.password,
          options: {
            data: {
              firstname: datas.firstName,
              lastname: datas.lastname,
            }
          }
      },
    )

    if(error){
      setRegisterResponse('error');
    }else{
      setRegisterResponse('send');
    }
    setModaleShowed(true);
  }

  return (
    <main className={`flex flex-col justify-center gap-12 min-h-[100svh] background-auth`}>
      { registerResponse == 'send' &&
        <PopupConfirm showed={modaleShowed} setShowed={(value) => setModaleShowed(value)} title='Vérification envoyée' imgPath='/assets/share.gif' text="Un lien de vérification a été envoyé sur votre adresse mail, veuillez l'ouvrir pour continuer." buttonText='Ok' buttonFunction={() => router.push('/authentication/login')}/>
      }
      { registerResponse == 'error' &&
        <PopupConfirm showed={modaleShowed} setShowed={(value) => setModaleShowed(value)} title="Erreur..." imgPath='/assets/cancel.gif' text="Une erreur s'est produite. Veuillez réessayer ultérieurement ou nous contacter si le problème persiste." buttonText='Ok' buttonFunction={() => router.push('/authentication/login')}/>
      }
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
      <form action={(e) => {setLoadingSubmit(true); {register ? signup(e) : login(e)}}} className="flex flex-col items-center mx-auto mb-0 mt-6 max-w-md w-[22rem] space-y-2 px-8 pb-6 text-black">

      { register &&
        <div className='w-full'>
          <label className="text-white text-sm w-full">Nom et Prénom</label>
          <div className='flex w-full gap-4'>
            <Input type="text" inputName="firstname" placeholder="Prénom..."/>
            <Input type="text" inputName="lastname" placeholder="Nom..."/>
          </div>
        </div>
      }

      <div className='w-full'>
        <label htmlFor="email" className="text-white text-sm">E-mail</label>
        <Input type="email" inputName="email" placeholder="E-mail..."/>
      </div>

      <div className='w-full'>
        <label htmlFor="password" className="text-white text-sm">Mot de passe</label>
        <Input type="password" inputName="password" placeholder="Mot de passe..."/>
      </div>

      { register &&
        <div className='w-full'>
        <label htmlFor="confirmPassword" className="text-white text-sm">Confirmation du mot de passe</label>
        <Input type="password" inputName="confirmPassword" placeholder="Confirmer le mot de passe..."/>
      </div>
      }

      <BadgeText text={errorInputs} type='error' blinking={errorBlink}/>

      <div className='w-full flex justify-between items-center gap-3'>
        <div className='w-full h-[1px] bg-gray-500'></div>
        <p className='text-gray-500 text-xs'>ou</p>
        <div className='w-full h-[1px] bg-gray-500'></div>
      </div>

      <div className='flex w-[100%] gap-5 pb-4'>
        <button type="button" className='flex justify-center w-full rounded-lg border-gray-bg-gray-50 p-2 text-sm shadow-sm bg-gray-50'><BiLogoFacebookSquare className='text-blue-900'/></button>
        <button type="button" onClick={googleSignIn} className='flex justify-center w-full rounded-lg border-gray-bg-gray-50 p-2 text-sm shadow-sm bg-gray-50'><FcGoogle/></button>
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
        type="submit"
        className={`flex justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-[100%] ${loadingSubmit && 'bg-opacity-70 text-opacity-70'}`}
      >
        {loadingSubmit &&       
        <span role="status" className='absolute'>
            <svg aria-hidden="true" className="w-4 h-4 inline text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </span>
        }
        {register ? "S'inscrire" : "Se connecter"}
      </button>
    </form>
   </main>
  )
}

export default Authentication
