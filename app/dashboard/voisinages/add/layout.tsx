import Topbar from "@/app/components/Topbar"
import Link from "next/link"

const AddVoisinageLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <Topbar breadcrumb="Ajouter un voisinage" backLink="/dashboard/voisinages"/>
      {children}
    </>
  )
}

export default AddVoisinageLayout
