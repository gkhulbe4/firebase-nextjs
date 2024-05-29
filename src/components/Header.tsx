"use client"
import { AuthContext } from '@/context/authContext';
import Link from 'next/link';
import React from 'react'
import Button  from '@mui/material/Button';
import logout from '@/db/auth/logout';
import { useRouter } from 'next/navigation';

function Header() {
    const {user}:any = AuthContext();
    const router = useRouter()
  return (
    <div>{user?.isLogin === true ? (
    <div>
        <Button onClick={async() => {
            const {SuccessMessage , error} = await logout()
            if(error){
                console.log(error)
            }
            console.log(SuccessMessage);
            router.push("/");
        }}>Logout</Button>
    </div>
    ) : (
    <div className="flex gap-4">
    <Link className="underline" href="/signup">Signup</Link>
    <Link className="underline" href="/signin">Signin</Link>
    <Link className="underline" href="/">Home</Link>
    </div>
    )}
    </div>
  )
}

export default Header