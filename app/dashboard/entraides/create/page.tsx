'use client'

import Topbar from '@/app/components/Topbar'
import Image from 'next/image'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

const CreateEntraide = () => {

  const categories = [
    {
      title: 'Animal perdu',
      image: '/assets/sad.png'
    },
    {
      title: 'Prêt matériel',
      image: '/assets/donation.png'
    },
    {
      title: 'Évènement',
      image: '/assets/calendar.png'
    },
    {
      title: 'Covoiturage',
      image: '/assets/car.png'
    },
    {
      title: 'Sondage',
      image: '/assets/satisfaction.png'
    }
  ]

  return (
    <>
      <Topbar breadcrumb='Nouvelle entraide' backLink='/dashboard/entraides'/>
      <main>
        <div className='flex flex-wrap justify-center gap-6 mt-6'>
          {
            categories.map((category) => (
              <div key={category.title} className='transition relative flex flex-col w-[40%] bg-white rounded-lg border-2 grayscale-[1] opacity-50 entraide-radio'>
                <label htmlFor={category.title}>
                  <div className='flex justify-center bg-blue-100 border-b-2 h-[15svh] p-4'>
                    <Image src={category.image} alt={category.title} width={200} height={200} className='object-contain'/>
                  </div>
                  <h3 className='flex items-center justify-center h-10 text-md text-gray-600 font-semibold rounded-b-sm'>{category.title}</h3>
                </label>
                <input type="radio" name="category" id={category.title} value={category.title} className="hidden" onChange={(e) => console.log(e.target.value)}/>
              </div>
            ))
          }
          <div className='transition relative flex flex-col w-[40%] bg-white rounded-lg border-2 grayscale-[1] opacity-50 entraide-radio'>
            <label htmlFor='Autres'>
              <div className='flex justify-center items-center bg-blue-100 rounded-t-md border-b-2 h-[15svh] p-4'>
                <BsThreeDots className='text-5xl'/>
              </div>
              <h3 className='flex items-center justify-center h-10 text-md text-gray-600 font-semibold rounded-b-sm'>Autres</h3>
            </label>
            <input type="radio" name="category" id={"Autres"} value={"Autres"} className="hidden" onChange={(e) => console.log(e.target.value)}/>
          </div>
        </div>

        <div className='absolute bottom-4 w-[100vw] flex justify-center gap-4 mt-10 px-4'>
          <button className='transition w-[100%] bg-gray-200 active:bg-gray-300 text-gray-600 font-medium rounded-md py-4'>
            Annuler
          </button>
          <button className='transition w-[100%] bg-blue-500 active:bg-blue-600 text-white font-medium rounded-md py-4'>
            Continuer
          </button>
        </div>
      </main>
    </>
  )
}

export default CreateEntraide
