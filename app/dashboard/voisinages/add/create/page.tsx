'use client'

import Topbar from "@/app/components/Topbar"
import Image from "next/image"
import React, { ChangeEvent, MouseEventHandler, useState } from "react"
import { MdEdit } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { toast } from "react-toastify";
import { IoIosLock, IoIosMail  } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import Link from "next/link";
import PopupConfirm from "@/app/components/utils/PopupConfirm";
import dynamic from 'next/dynamic'; // Composant LeafletMap chargé dynamiquement 
const Map = dynamic( () => import('@/app/components/utils/Map'), { ssr: false } );


const CreateVoisinage = () => {

  const [profilePic, setProfilePic] = useState<File | null>(null)
  const [infoPrivacy, setInfoPrivacy] = useState<string>("demande")
  const [showedPosition, setShowedPosition] = useState<boolean>(false)

  const sendCreate = (formDatas: FormData) => {

  }

  const updateProfilePic = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const maxSize = 1048576; //1Mo max
    if (input.files![0].type.indexOf('image') === -1) {
      toast.error("Le fichier doit être une image", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "colored"
      })
      input.value = '';
      return;
    }

    if (input.files![0].size > maxSize) {
      //TODO refacto toast pour appeler les plus courrants depuis le store
      //TODO revoir la taille des images, réduire leur taille...
      toast.error("Le fichier est trop volumineux", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "colored"
      })
      input.value = '';
      return;
    }

    setProfilePic(input.files![0]);
  }

  const resetProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    setProfilePic(null);
  }

  return (
    <>
      <Topbar breadcrumb="Créer un voisinage" backLink="/dashboard/voisinages/add"/>
      <main>

        <PopupConfirm title="Position du voisinage" buttonText="Créer" cancelButtonText="Annuler" showed={showedPosition} setShowed={setShowedPosition} buttonFunction={() => setShowedPosition(false)}>          
          <div className="w-full h-[300px] overflow-hidden mt-3">
            <Map needGeoLocation={true}/>
          </div>
        </PopupConfirm>

        <form action={(datas) => sendCreate(datas)} className="flex flex-col items-center justify-between take-full-height-with-header">
          <div className="flex flex-col items-center justify-between max-w-[30em]">
            <label htmlFor="pfp" className="relative mt-8">
              <Image src={profilePic ? URL.createObjectURL(profilePic) : "/assets/voisinage.jpg"} alt="Photo du voisinage" height={200} width={200} className="rounded-full shadow-md border-2 border-gray-300 h-[9rem] w-[9rem] object-cover"/>
              <div className="absolute bottom-1 right-0 bg-blue-500 rounded-full p-2 border-2 border-gray-200 shadow-inner">
                <MdEdit className="text-white"/>
              </div>
              <div className="absolute top-1 right-0 bg-white rounded-full p-2 border-2 border-gray-200 shadow-inner" onClick={(e) => resetProfile(e)}>
                <GrPowerReset className="text-red-500"/>
              </div>
            </label>
            <input type="file" name="pfp" id="pfp" accept="image/png, image/jpeg" className="hidden" onChange={(e) => updateProfilePic(e)}/>

            <input type="text" className="py-2 px-3 w-[16rem] mt-6 border-2 border-gray-300 rounded-lg text-lg" placeholder="Nom du voisinage..." id="name" />

            <div className="flex justify-center w-full gap-4 mt-8 px-12">
              <div className="transition relative flex flex-col justify-center border-blue-500 text-blue-500 border-4 w-full max-w-[20rem] h-[6rem] rounded-lg privacy-choice">
                <label htmlFor="public" className="flex flex-col items-center">
                  <TbWorld className="text-4xl" />
                  <span className="text-sm">Ouvert</span>
                  <TbTriangleInvertedFilled  className="absolute -top-2 text-white icon-border"/>
                </label>
                <input type="radio" name="privacy" id="public" value="public" className="hidden" onChange={() => setInfoPrivacy("public")}/>
              </div>
              <div className="transition relative flex flex-col justify-center border-blue-500 text-blue-500 border-4 w-full max-w-[20rem] h-[6rem] rounded-lg privacy-choice">
                <label htmlFor="demande" className="flex flex-col items-center">
                  <IoIosMail className="text-4xl"/>
                  <span className="text-sm">Demande</span>
                  <TbTriangleInvertedFilled  className="absolute -top-2 text-white icon-border"/>
                </label>
                <input type="radio" name="privacy" id="demande" value="demande" className="hidden" onChange={() => setInfoPrivacy("demande")} defaultChecked/>
              </div>
              <div className="transition relative flex flex-col justify-center border-blue-500 text-blue-500 border-4 w-full max-w-[20rem] h-[6rem] rounded-lg privacy-choice">
                <label htmlFor="private" className="flex flex-col items-center">
                  <IoIosLock className="text-4xl" />
                  <span className="text-sm">Privé</span>
                  <TbTriangleInvertedFilled  className="absolute -top-2 text-white icon-border"/>
                </label>
                <input type="radio" name="privacy" id="private" value="private" className="hidden" onChange={() => setInfoPrivacy("private")}/>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6 pe-8 ps-12 text-sm max-w-full">
              { infoPrivacy === "public" &&
              <p><span className="font-bold me-1 py-2"><TbWorld className="inline-block relative -top-[2px]"/>Ouvert: </span>
                <br/>
                {"N'importe qui peut rejoindre le voisinage sans demander la permission."}
                <br/>
                {"Il sera visible de tous les utilisateurs."}
              </p>
              }
              { infoPrivacy === "demande" &&
              <p><span className="font-bold me-1 py-2"><IoIosMail className="inline-block relative -top-[1.3px]"/>Sur demande: </span>
                <br/>
                {"Accessible par les utilisateurs dont la demande a été validée par un membre du voisinage."}
                <br/>
                {"Il sera visible de tous les utilisateurs."}
              </p>
              }
              { infoPrivacy === "private" &&
              <p><span className="font-bold me-1 py-2"><IoIosLock className="inline-block relative -top-[2.5px]"/>Privé: </span>
                <br/>
                {"Le voisinage sera uniquement accessible avec un lien d'invitation."}
                <br/>
                {"Invisible des autres utilisateurs."}
              </p>
              }
            </div>
          </div>


          <div className="flex gap-4 -mb-4 mt-10">
            <Link className="w-[42vw] py-2 text-gray-500 font-bold rounded-lg text-center" href="/dashboard/voisinages/add">Annuler</Link>
            <button className="w-[42vw] bg-blue-500 text-white font-bold rounded-lg" onClick={() => setShowedPosition(true)}>Suivant</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default CreateVoisinage