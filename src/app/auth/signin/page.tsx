'use client';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


function Signin() {
    const { data: session } = useSession()

    /*
    // With Custom Page: Sign in with github
    if(!session){
        return (
            <button onClick={() => signIn('github')}>
            Sign in with GitHub
          </button>
        )
    }
    */

    // Sign in using nextjs default unbranaded pages
    if(!session){
        return (
            <button onClick={() => signIn()}>
            Sign in
          </button>
        )
    }

    return (
        <div>
            <h1>hello</h1>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

export default Signin