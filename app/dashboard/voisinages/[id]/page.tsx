'use client'

import Topbar from '@/app/components/Topbar'
import { voisinageStore } from '@/app/store/voisinagesStore'
import React, { useEffect, useState } from 'react'
import { MdKeyboardVoice } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import Image from 'next/image';
import { userStore } from '@/app/store/userStore';
import { IoSend } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaRunning } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import Link from 'next/link';
import { messageType } from '@/app/types';

const Voisinage = () => {

  const [messageContent, setMessage] = useState<string>('')
  const [menuOpened, setMenuOpened] = useState<boolean>(false)
  
  useEffect(() => {
    const main = document.querySelector('main')
    main && main.addEventListener('click', (e) => {
      setMenuOpened(false);
    })
  }, [])
  const user = userStore((state) => state.user)
  user.id = '5';
  const voisinages = voisinageStore((state) => state.voisinages)
  const voisinageName = voisinages[0].name
  const voisinagesId = voisinages[0].id
  const voisinageImage = voisinages[1].photo
  const mockMessages: messageType[] = [
    {
      user: {
        id: '1',
        firstname: 'Eliott',
        lastname: 'Paillasson',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      message: '',
      messageImage: 'https://randomuser.me/api/portraits/men/8.jpg',
      date: new Date(2021, 11, 1),
      readed: true,
    },
    {
      user: {
        id: '2',
        firstname: 'Eliott',
        lastname: 'Paillasson',
        photo: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      message: 'Joli !',
      messageImage: '',
      date: new Date(2021, 11, 1),
      readed: true,
    },
    {
      user: {
        id: '3',
        firstname: 'Eliott',
        lastname: 'Paillasson',
        photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      message: 'iujziueh iuehfiu fesiuhf fi hi fesiuhfse fhis fesfh fsi f sieuhfse fhsjefsk fhsjehk lkjq qjqlzkjdqlzkd qlzkdjkz qkq zkjdlqd qljd. qzoid qq qoizjd qzoi dzjndkq zd qndjkqzd ddddd.',
      messageImage: '',
      date: new Date(2021, 11, 3),
      readed: true,
    },
    {
      user: {
        id: '4',
        firstname: 'Eliott',
        lastname: 'Paillasson',
        photo: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
      message: 'Cest toi le iuehfish on chi',
      messageImage: '',
      date: new Date(2021, 11, 3),
      readed: true,
    },
    {
      user: {
        id: '5',
        firstname: 'Eliott',
        lastname: 'Paillasson',
        photo: 'https://randomuser.me/api/portraits/men/5.jpg',
      },
      message: 'Mais non en fait je ne vois pas ce qeu tu veux dire mais cest un truc de fou quand même ?!?!',
      messageImage: '',
      date: new Date(2021, 11, 3),
      readed: true,
    },
    {
      user: {
        id: '6',
        firstname: 'Eliott',
        lastname: 'Paillasson',
        photo: 'https://randomuser.me/api/portraits/men/6.jpg',
      },
      message: 'Du calme !',
      messageImage: '',
      date: new Date(),
      readed: false,
    }
  ]

  return (
    <>
      <Topbar
        breadcrumb={voisinageName}
        backLink='/dashboard/voisinages'
        breadcrumbLink={`/dashboard/voisinages/${voisinagesId}/detail`}
        image={voisinageImage}
      >
      <div className="relative">
          <button className="transition px-3 py-3 text-sm/none active:bg-gray-100 rounded-full" onClick={(e) => {setMenuOpened(true)}}>
            <HiDotsVertical className='text-xl'/>
          </button>
          <div
            className={`absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border text-gray-500 border-gray-100 bg-white shadow-lg text-sm transition ${!menuOpened && 'opacity-0 pointer-events-none'}`}
            role="menu"
          >
            <div className="p-2">
              <button
                className="block rounded-lg px-4 py-2 active:bg-gray-50 active:text-gray-700 w-full text-start"
                role="menuitem"
              >
                Informations
              </button>

              <button
                className="block rounded-lg px-4 py-2 active:bg-gray-50 active:text-gray-700 w-full text-start"
                role="menuitem"
              >
                Médias
              </button>
            </div>

            <div className="p-2">
              <button
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 active:bg-red-50"
                role="menuitem"
              >
                <FaRunning className='scale-x-[-1]'/>
                Quitter le groupe
              </button>

              <button
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 active:bg-red-50 -mt-1"
                role="menuitem"
              >
                <MdReportProblem />
                Signaler le groupe
              </button>
            </div>
          </div>
        </div>
      </Topbar>
      <main>
        <div className='absolute bottom-8 flex flex-col gap-3 max-h-[90svh] overflow-auto py-10 scroll-hide w-[100%]'>
        {
          mockMessages.map((message, index) => (
            <div key={index} className={`flex flex-col ${message.user.id == user.id && 'items-end'}`}>
              { (message.user.id != user.id && (mockMessages.findIndex(m => m.readed == false) == index)) &&
                <div className='w-full flex justify-center items-center gap-3 mb-4'>
                  <div className='w-[35%] h-[1px] bg-red-300'></div>
                  <p className='text-red-500 text-xs'>Nouveaux</p>
                  <div className='w-[35%] h-[1px] bg-red-300'></div>
                </div>
              }

              { 
                //check if it's the first message from the message's date AND if it's not a new message
                (!(message.user.id != user.id && (mockMessages.findIndex(m => m.readed == false) == index)) && mockMessages.indexOf(message) == mockMessages.findIndex(m => m.date.toISOString() == message.date.toISOString())) &&
                <div className='w-full flex justify-center items-center gap-3 mb-7 mt-3'>
                  <div className='w-[35%] h-[1px] bg-gray-300'></div>
                  <p className='text-gray-500 text-xs'>{message.date.toLocaleDateString('fr-FR', {year: 'numeric', month: 'short', day: 'numeric'})}</p>
                  <div className='w-[35%] h-[1px] bg-gray-300'></div>
                </div>
              }
              <div className={`flex items-end gap-4 px-4 max-w-[80vw]`}>
                {
                  message.user.id != user.id &&
                  <Link href={`/dashboard/profile/${message.user.id}`} className='w-[2em] h-[2em] min-w-[2em] rounded-full overflow-hidden'>
                    <Image src={message.user.photo} alt={message.user.firstname} width={50} height={50} className='w-[2em] h-[2em] object-cover'/>
                  </Link>
                }
                {
                  message.messageImage &&
                  <Image src={message.messageImage} alt={message.user.firstname} width={400} height={400} className='rounded-lg max-w-[80vw] max-h-[140vw] object-cover'/>
                }
                {
                  message.message &&
                  <p className={`relative text-gray-600 bg-gray-200 rounded-lg px-3 py-2 ${message.user.id == user.id && '!bg-blue-500 text-white'}`}>{message.message}
                    <span className={`absolute ${message.user.id == user.id ? '-right-2' : '-left-2'} bottom-0 w-4 h-4 ${message.user.id == user.id ? 'bg-blue-500' : 'bg-gray-200'}`}></span>
                    <span className={`absolute ${message.user.id == user.id ? '-right-3 rounded-bl-full' : '-left-3 rounded-br-full'} -bottom-[.2em] w-3 h-[105%] bg-white`}></span>
                    <span className={`${message.user.id == user.id ? 'text-end text-gray-300' : 'text-gray-400'} block text-xs`}>{message.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </p>
                }
              </div>
            </div>
          ))
        }
        </div>
        <div className='absolute bottom-4 flex justify-center w-full px-4 gap-2'>
          <button className='flex justify-center items-center min-w-[2.5em] min-h-[2.5em] bg-gray-200 border-gray-400 text-gray-400 rounded-full'><GrAttachment className='text-xl'/></button>
          <input type="text" className='w-full h-[2.5em] px-4 bg-gray-200 placeholder-gray-400 rounded-full' placeholder='Ecrivez votre message...' onChange={(e) => setMessage(e.target.value)}/>
          <button className={`flex justify-center items-center min-w-[2.5em] min-h-[2.5em] text-white rounded-full ${messageContent.length > 0 ? 'bg-green-500' : 'bg-blue-500'}`}>
            {
              messageContent.length > 0 ?
              <IoSend className='text-xl'/>
              :
              <MdKeyboardVoice className='text-2xl'/>
            }
          </button>
        </div>
      </main>
    </>
  )
}

export default Voisinage
