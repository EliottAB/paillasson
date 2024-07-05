'use client'

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import { create } from 'zustand'
import Loader from "../components/Loader";
import Topbar from "../components/Topbar";
import BottomNav from "../components/BottomNav";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
export const supabase = createClient(supabaseUrl, supabaseKey);

const Dashboard = ({children}: {children: React.ReactNode}) => {

  const router = useRouter();
  const [userSession, setUserSession] = useState<null | object>(null);

  const getSessionUser = useCallback(async () => {
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/authentication/login");
      return;
    }
    setUserSession(session);

    // const userDatas = await supabase.from("f_users").select("firstname, lastname, premium, tag")
    // const {data, error} = await supabase.from("f_voisinage").insert({name: 'sooooooperrrrr', confidentiality: 'private'})
    // console.log(data, error)

    interface store {
      user: {email: string | undefined, firstname: string | undefined, lastname: string | undefined},
    }    

    const useStore = create<store>((set) => ({
      user: {
        email: session.user.email,
        firstname: session.user.user_metadata.firstname,
        lastname: session.user.user_metadata.lastname,
      },
    }))
  }, [router]);
  
  useEffect(() =>{
    getSessionUser();
  }, [getSessionUser, router])

  return (
    <>
    {/* {userSession ? */}
    {userSession ?
    <>
      {children} 
      <BottomNav/>
    </>
    : <Loader/>
    }
    </>
  )
}

export default Dashboard
