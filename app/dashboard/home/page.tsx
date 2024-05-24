'use client'

import Topbar from "@/app/components/Topbar"
import { entraidesStore } from "@/app/store/entraidesStore"
import { Voisinage, voisinageStore } from "@/app/store/voisinagesStore"
import Image from "next/image"
import { useEffect } from "react"

const Home = () => {

  const voisinages = voisinageStore((state) => state.voisinages);
  const entraides = entraidesStore((state) => state.entraides);

  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  }

  function error() {
    console.log("error");
  }

  const getVoisinageAction = (voisinage: Voisinage) => {
    if(voisinage.joined) return {style: 'text-white bg-blue-500', text: 'Aller'};
    if(voisinage.requested) return {style: 'text-gray-400 bg-gray-100 border-2', text: 'Demandé'};
    if(voisinage.privacy === "public") return {style: 'text-white bg-green-500', text: 'Rejoindre'};
    if(voisinage.privacy === "demande") return {style: 'text-blue-500 bg-white border-2 border-blue-500 !font-bold', text: 'Demander'};
  }

  useEffect(() => {
    if(!(navigator.geolocation)) return;
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  return (
    <>
      <Topbar breadcrumb="Paillasson"/>
      <main className="pb-10">
        <article>
          <section>
            <ul className="flex gap-3 px-4 my-3 max-w-[100vw] overflow-auto scroll-hide pt-12 pb-5">
              {
                voisinages.map((voisinage, index) => {
                  return (
                    <li key={index} className="relative flex flex-col justify-between items-center border-2 rounded-md shadow-lg h-[8rem] min-w-[12rem]">
                      <Image className="rounded-full absolute bottom-[75%] bg-white shadow-sm shadow-gray-700" src={voisinage.photo} alt="Photo de profile du voisinage" width={75} height={75} />
                      <h3 className="font-bold mt-10">{voisinage.name}</h3>
                      <p className="text-[.7rem] font-light text-gray-400 -mt-3">{voisinage.description}</p>
                      <button className={`inline-block rounded-lg px-5 py-1 text-sm font-medium mb-3 ${getVoisinageAction(voisinage)?.style}`}>{getVoisinageAction(voisinage)?.text}</button>
                    </li>
                  )
                })
              }
            </ul>
          </section>

          <section className="mt-6">
            <div className="w-[100vw] h-[2px] bg-gray-200"></div>
            <h2 className="text-2xl font-bold px-4 py-4">Entraides récentes</h2>
            <ul className="flex justify-center flex-wrap items-center gap-10 px-4 my-3 scroll-hide pb-5">
              {
                entraides.map((entraide, index) => {
                  return (
                    <li key={index} className="relative flex flex-col items-center border-2 rounded-md shadow-lg h-[20rem] w-[30rem]">
                      <div className="relative flex justify-center w-full h-[50%]">
                        <Image className="w-full object-cover object-top rounded-t-sm border-b-2" src={entraide.photo} alt="Photo de profile du voisinage" width={150} height={150} />
                        <Image className="absolute -bottom-[2%] border-2 rounded-full" src={entraide.voisinagePhoto} alt="Photo de profile du voisinage" width={70} height={70}/>
                        <div className="absolute -bottom-[0] px-4 border-2 border-b-0 bg-white text-black font-bold text-[.6rem] rounded-t-sm h-[.5rem]">
                          <p className="bg-white">{entraide.voisinageName}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center mt-6">
                        <h3 className="font-bold px-5 mb-1 text-center line-clamp-1">{entraide.title}</h3>
                        <p className="text-[.8rem] font-light px-3 leading-3 text-center text-gray-400 line-clamp-3">{entraide.description}</p>
                      </div>
                      <button className="absolute bottom-0 inline-block rounded-lg px-5 py-1 text-sm font-medium mb-3 bg-white text-blue-500 border-2 border-blue-500">Afficher</button>
                    </li>
                  )
                })
              }
            </ul>
          </section>
        </article>
      </main>
    </>
  )
}

export default Home
