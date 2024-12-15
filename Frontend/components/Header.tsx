'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      setUsername(localStorage.getItem('username') || 'User')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-purple-800/30">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400">
          BiasSage
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/" className="text-gray-200 hover:text-pink-300 transition-colors duration-300">
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link href="/detect" className="text-gray-200 hover:text-purple-300 transition-colors duration-300">
                Analyze
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <>
              <li className="text-gray-200">
                Welcome, {username}
              </li>
              <li>
                <Button onClick={handleLogout} variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
                  Logout
                </Button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  )
}

