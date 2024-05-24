'use client'

import { IoSearch } from "react-icons/io5";
import { LuMessageSquare  } from "react-icons/lu";
import Link from "next/link";
import { Sofia_Sans_Extra_Condensed } from "next/font/google";
import { FaChevronLeft } from "react-icons/fa"
import { usePathname, useRouter } from "next/navigation";
const sofia_Sans = Sofia_Sans_Extra_Condensed({ subsets: ["latin"] });

const Topbar = ({breadcrumb, backLink}: {breadcrumb: string, backLink?: string}) => {

  const pathName = usePathname();
  const router = useRouter();
  const pathArray = pathName.split("/");

  return (
    <header className="fixed top-0 w-[100vw] flex items-center pt-4 pb-2 px-5 color-text border-b-2 bg-white z-30 main-header">
      {
        (pathArray.length > 3 && backLink) &&
        <button className="w-12 ps-3 -ms-3 h-[2rem]" onClick={() => router.push(backLink)}><FaChevronLeft/></button>
      }
      <h3 className={`${sofia_Sans.className} text-3xl text-center`}>{breadcrumb}</h3>
      <div className="absolute right-4 flex items-center gap-4 text-2xl">
        {
          pathArray.length <= 3 &&
          <>
            <button><IoSearch/></button>
            <Link href="/messages" className="relative"><LuMessageSquare /><span className="absolute top-[-.3rem] right-[-.4rem] flex items-center justify-center w-4 h-4 rounded-full bg-red-600 text-white text-xs font-bold">5</span></Link>
          </>
        }
      </div>
    </header>
  )
}

export default Topbar