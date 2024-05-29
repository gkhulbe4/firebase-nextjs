"use client"
import React, { useEffect } from 'react'
import { AuthContext } from '../../context/authContext';
import { useRouter } from 'next/navigation';

function AdminPage() {
  const {user}:any = AuthContext();
  const router = useRouter()
  useEffect(() => {
    if(user?.isLogin === false){
      router.push("/signin")
    }
  },[])

  return (
    <div>
      Welcome user
    </div>

  )
}

export default AdminPage