import { IoSearch } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import Link from "next/link";
import { Sofia_Sans_Extra_Condensed } from "next/font/google";
const sofia_Sans = Sofia_Sans_Extra_Condensed({ subsets: ["latin"] });

const Topbar = (props: {breadcrumb: string}) => {


  return (
    <div className="w-[100vw] flex justify-between pt-8 px-5 color-text">
      <h3 className={`${sofia_Sans.className} text-3xl`}>{props.breadcrumb}</h3>
      <div className="flex items-center gap-4 text-2xl">
        <button><IoSearch/></button>
        <Link href="/messages" className="relative"><IoMailOutline/><span className="absolute top-[-.2rem] right-[-.5rem] flex items-center justify-center w-4 h-4 rounded-full bg-red-600 text-xs font-bold">5</span></Link>
      </div>
    </div>
  )
}

export default Topbar