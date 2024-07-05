'use client'

import Topbar from '@/app/components/Topbar'
import { entraideCreationStore } from '@/app/store/entraidesStore'
import { toast } from 'react-toastify'
const CreateEntraide = ({children}: {children: React.ReactNode}) => {

  const entraideCreation = entraideCreationStore((state) => state)
  const continueEntraide = () => {
    const category = entraideCreation.entraideCreation.category
    console.log(category)
    if (category === '') {
      toast.warning("Veuillez choisir une catégorie", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "colored"
      })
      return
    }
  }

  return (
    <>
      <Topbar breadcrumb='Nouvelle entraide' backLink='/dashboard/entraides'/>
      <main>
        {children}

        <div className='absolute bottom-4 w-[100vw] flex justify-center gap-4 mt-10 px-4'>
        <button className='transition w-[100%] bg-gray-200 active:bg-gray-300 text-gray-600 font-medium rounded-md py-4'>
          Annuler
        </button>
        <button className='transition w-[100%] bg-blue-500 active:bg-blue-600 text-white font-medium rounded-md py-4' onClick={() => continueEntraide()}>
          Continuer
        </button>
      </div>
      </main>
    </>
  )
}

export default CreateEntraide
