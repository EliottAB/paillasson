'use client'

import Topbar from "@/app/components/Topbar"
import { Voisinage, voisinageStore } from "@/app/store/voisinagesStore"
import Image from "next/image"
import Link from "next/link"
import { FaPlus } from "react-icons/fa"

const Voisinages = () => {

  const voisinages = voisinageStore((state) => state.userVoisinages)
  const nearVoisinages = voisinageStore((state) => state.userVoisinages.filter(voisinage => !voisinage.joined))

  const getVoisinageAction = (voisinage: Voisinage) => {
    if(voisinage.requested) return {style: 'text-gray-400 bg-gray-100 border-2', text: 'Demandé'};
    if(voisinage.privacy === "public") return {style: 'text-white bg-green-500', text: 'Rejoindre'};
    if(voisinage.privacy === "demande") return {style: 'text-blue-500 bg-white border-2 border-blue-500 !font-bold', text: 'Demander'};
  }

  return (
    <>
      <Topbar breadcrumb="Voisinages"/>
      <main>
        <div className="flex flex-col items-center">
          <Link href="/dashboard/voisinages/add" className="transition relative flex justify-center items-center gap-3 w-[20rem] mt-5 py-2 bg-blue-500 active:bg-blue-600 text-white rounded-lg">
            <FaPlus/>
            Ajouter un voisinage
          </Link>
          {
            voisinages.length === 5 &&
            <div className="flex flex-col items-center w-100">
              <Image className="grayscale-[100%] opacity-50" src={'/assets/humans.svg'} alt="Image grisée d'humains parlants" width={300} height={300}/>
              <p className="text-gray-400 text-sm -mt-3">Aucun voisinage</p>
            </div>
          }
        </div>
        
        <h2 className="ps-5 mt-5 mb-3 font-bold text-xl">Suggestions</h2>

        <ul className="w-full">
          {
            nearVoisinages.map((voisinage, index) => (
              <li key={index} className={`flex items-center gap-3 mx-6 py-3 ${index === nearVoisinages.length - 1 ? '' : 'border-b'}`}>
                <Image src={voisinage.photo} alt="Image de l'activité" width={50} height={50}/>
                <div className="flex flex-col">
                  <h3 className="font-bold">{voisinage.name}</h3>
                  <p className="text-gray-400 text-xs font-light leading-3">{voisinage.description}</p>
                </div>
                <button className={`absolute right-5 rounded-lg w-24 py-1 text-sm font-medium ${getVoisinageAction(voisinage)?.style}`}>{getVoisinageAction(voisinage)?.text}</button>
              </li>
            ))
          }
        </ul>
      </main>
    </>
  )
}

export default Voisinages
