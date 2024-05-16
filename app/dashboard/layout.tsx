'use client'

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import { create } from 'zustand'
import Loader from "../components/Loader";
import Topbar from "../components/Topbar";
import BottomNav from "../components/BottomNav";

const Dashboard = ({children}: {children: React.ReactNode}) => {

  const router = useRouter();
  const [userSession, setUserSession] = useState<null | object>(null);

  const getSessionUser = useCallback(async () => {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/authentication/login");
      return;
    }
    setUserSession(session);

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
    // getSessionUser();
  }, [getSessionUser, router])

  return (
    <>
    {/* {userSession ? */}
    {true ?
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
