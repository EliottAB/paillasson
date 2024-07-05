'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { entraideCreationStore } from '@/app/store/entraidesStore'

const EntraideCateg = () => {

  const creationStore = entraideCreationStore((state) => state)
  const [category, setCategory] = useState('')

  const saveCategory = (categ: string) => {
    creationStore.setCategory(categ)
    setCategory(categ)
  }

  const continueEntraide = () => {
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
    <div className='flex flex-wrap justify-center gap-6 mt-6'>
      {
        categories.map((element) => (
          <div key={element.title} className='transition relative flex flex-col w-[40%] bg-white rounded-lg border-2 grayscale-[1] opacity-50 entraide-radio'>
            <label htmlFor={element.title}>
              <div className='flex justify-center bg-blue-100 border-b-2 h-[15svh] p-4'>
                <Image src={element.image} alt={element.title} width={200} height={200} className='object-contain'/>
              </div>
              <h3 className='flex items-center justify-center h-10 text-md text-gray-600 font-semibold rounded-b-sm'>{element.title}</h3>
            </label>
            <input type="radio" name="category" id={element.title} value={element.title} className="hidden" onChange={() => saveCategory(element.title)}/>
          </div>
        ))
      }
      <div className='transition relative flex flex-col w-[40%] bg-white rounded-lg border-2 grayscale-[1] opacity-50 entraide-radio'>
        <label htmlFor='Autres'>
          <div className='flex justify-center items-center bg-blue-100 rounded-t-md border-b-2 h-[15svh] p-4'>
            <BsThreeDots className='text-5xl'/>
          </div>
          <h3 className='flex items-center justify-center h-10 text-md text-gray-600 font-semibold rounded-b-sm'>Autre</h3>
        </label>
        <input type="radio" name="category" id={"Autres"} value={"Autres"} className="hidden" onChange={() => saveCategory('Autres')}/>
      </div>
    </div>
  )
}

export default EntraideCateg
