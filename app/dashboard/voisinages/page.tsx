'use client'

import Topbar from "@/app/components/Topbar"
import { voisinageStore } from "@/app/store/voisinagesStore"

const page = () => {

  const voisinages = voisinageStore((state) => state.userVoisinages)

  return (
    <>
      <Topbar breadcrumb="Voisinages"/>
      <main>
        <button>Nouveau </button>
        {

        }
      </main>
    </>
  )
}

export default page
