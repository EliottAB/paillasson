'use client'

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import Loader from "../components/Loader";

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
  }, [router]);
  
  useEffect(() =>{
    getSessionUser();
  }, [getSessionUser, router])

  return (
    <>
    {userSession ? children : <Loader/>}
    </>
  )
}

export default Dashboard
