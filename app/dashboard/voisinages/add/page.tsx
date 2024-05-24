import Topbar from '@/app/components/Topbar'
import Image from 'next/image'
import Link from 'next/link'

const Choose = () => {
  return (
    <>
      <Topbar breadcrumb="Ajouter un voisinage" backLink="/dashboard/voisinages"/>
      <main className='flex justify-center items-center'>
        <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-12 py-6 lg:w-[50%] take-full-height-with-header'>
          <Link className='relative flex flex-col w-[85%] pb-4 bg-white rounded-lg border-4 shadow-lg' href="/dashboard/voisinages/add/join">
            <div className='flex justify-center bg-blue-100 border-b-4 h-[22svh]'>
              <Image src="/assets/3_humans.svg" alt="Trois personnes discutant" width={200} height={200} className='object-contain'/>
            </div>
            <div className='px-4'>
              <h3 className='mt-4 text-xl mb-2'>Rejoindre un voisinage</h3>
              <p className='text-sm text-gray-400'>Rejoignez un voisinage déjà existant avec son nom ou un lien externe.</p>
            </div>
          </Link>

          <Link className='relative flex flex-col w-[85%] pb-4 bg-white rounded-lg border-4 shadow-lg' href="/dashboard/voisinages/add/create">
            <div className='flex justify-center bg-blue-100 border-b-4 py-6 h-[22svh]'>
              <Image src="/assets/sketchbook.png" alt="Trois personnes discutant" width={200} height={200} className='object-contain'/>
            </div>
            <div className='px-4'>
              <h3 className='mt-4 text-xl mb-2'>Créer un voisinage</h3>
              <p className='text-sm text-gray-400'>Créez votre propre voisinage si aucun autre ne correspond à vos recherches.</p>
            </div>
          </Link>
        </div>
      </main>
    </>
  )
}

export default Choose
