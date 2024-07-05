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
import { supabase } from "@/app/dashboard/layout";
import dynamic from 'next/dynamic'; // Composant LeafletMap chargé dynamiquement 
import RadioChoice from "@/app/components/radioChoice";
import RadioChoiceItem from "@/app/components/radioChoiceItem";
const Map = dynamic( () => import('@/app/components/utils/Map'), { ssr: false } );


const CreateVoisinage = () => {

  const [profilePic, setProfilePic] = useState<File | null>(null)
  const [infoPrivacy, setInfoPrivacy] = useState<string>("demande")
  const [showedPosition, setShowedPosition] = useState<boolean>(false)
  const [position, setPosition] = useState<any>([0, 0])
  const formRef = React.useRef<HTMLFormElement>(null);

  const sendCreate = async () => {
    const privacyInput = formRef.current?.elements.namedItem('privacy') as HTMLInputElement;
    const nameInput = formRef.current?.elements.namedItem('name') as HTMLInputElement;
    const privacy = privacyInput.value;
    const name = nameInput.value;
    if (position[0] == 0 && position[1] == 0) {
      toast.error("La position est obligatoire", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "colored"
      })
      return 'error';
    }
    const {data, error} = await supabase.from("f_voisinage").insert({name: name, confidentiality: privacy, location_x: position[0], location_y: position[1]})
    console.log(position, error)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // setShowedPosition(false);
  }

  const continueToMap = () => {
    const nameInput = formRef.current?.elements.namedItem('name') as HTMLInputElement;
    const name = nameInput.value;
    if (name.length <= 3) {
      toast.error("Le nom du voisinage doit comporter au moins 3 caractères", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "colored"
      })
      return;
    }
    setShowedPosition(true)
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

        <PopupConfirm title="Position du voisinage" buttonText="Créer" cancelButtonText="Annuler" showed={showedPosition} setShowed={setShowedPosition} buttonFunction={() => sendCreate()}>          
          <div className="w-full h-[300px] overflow-hidden mt-3">
            <Map needGeoLocation={true} position={position} setPosition={setPosition}/>
          </div>
        </PopupConfirm>

        <form action={() => sendCreate()} ref={formRef} className="flex flex-col items-center justify-between take-full-height-with-header">
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

            <input type="text" className="py-2 px-3 w-[16rem] mt-6 border-2 border-gray-300 rounded-lg text-lg" placeholder="Nom du voisinage..." name="name" id="name" />

            <RadioChoice>
              <RadioChoiceItem inputName="privacy" inputValue="public" setState={setInfoPrivacy}>
                <TbWorld className="text-4xl" />
              </RadioChoiceItem>
              <RadioChoiceItem inputName="privacy" inputValue="demande" setState={setInfoPrivacy}>
                <IoIosMail className="text-4xl"/>
              </RadioChoiceItem>
              <RadioChoiceItem inputName="privacy" inputValue="private" setState={setInfoPrivacy}>
                <IoIosLock className="text-4xl" />
              </RadioChoiceItem>
            </RadioChoice>

            <div className="flex flex-col gap-2 mt-6 pe-8 ps-12 text-sm max-w-full">
              <p>
                <span className="font-bold me-1 py-2">
                  {infoPrivacy === "public" && <><TbWorld className="inline-block relative -top-[2px]"/>Ouvert: </>}
                  {infoPrivacy === "demande" && <><IoIosMail className="inline-block relative -top-[1.3px]"/>Sur demande: </>}
                  {infoPrivacy === "private" && <><IoIosLock className="inline-block relative -top-[2.5px]"/>Privé: </>}
                </span>
                <br/>
                {infoPrivacy === "public" && "N'importe qui peut rejoindre le voisinage sans demander la permission."}
                {infoPrivacy === "demande" && "Accessible par les utilisateurs dont la demande a été validée par un membre du voisinage."}
                {infoPrivacy === "private" && "Le voisinage sera uniquement accessible avec un lien d'invitation."}
                <br/>
                {infoPrivacy === "public" && "Il sera visible de tous les utilisateurs."}
                {infoPrivacy === "demande" && "Il sera visible de tous les utilisateurs."}
                {infoPrivacy === "private" && "Invisible des autres utilisateurs."}
              </p>
            </div>
          </div>


          <div className="flex gap-4 -mb-4 mt-10">
            <Link className="w-[42vw] py-2 text-gray-500 font-bold rounded-lg text-center" href="/dashboard/voisinages/add">Annuler</Link>
            <button type="button" className="w-[42vw] bg-blue-500 text-white font-bold rounded-lg" onClick={() => continueToMap()}>Suivant</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default CreateVoisinage