import Link from "next/link"
import { GoHomeFill } from "react-icons/go";
import { FaHandsHelping } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

const BottomNav = () => {

  const pathName = usePathname();
  const pathArray = pathName.split("/");
  if (pathArray.length > 3) return;

  const actualPathColor = (path: string) => {
    if (pathName === path) return 'text-black';
    return 'text-gray-400';
  }

  return (
    <nav className="fixed bottom-0 w-[100vw] border-t-2 bg-white">
      <ul className="w-full flex justify-between px-8 py-3">
        <Link href="/dashboard/home"><GoHomeFill className={`transition text-2xl ${actualPathColor('/dashboard/home')}`}/></Link>
        <Link href="/dashboard/voisinages"><BiWorld className={`transition text-2xl ${actualPathColor('/dashboard/voisinages')}`}/></Link>
        <Link href="/dashboard/entraides"><FaHandsHelping className={`transition text-2xl ${actualPathColor('/dashboard/entraides')}`}/></Link>
        <Link href="/dashboard/profile"><FaUserCircle className={`transition text-2xl ${actualPathColor('/dashboard/profile')}`}/></Link>
      </ul>
    </nav>
  )
}

export default BottomNav