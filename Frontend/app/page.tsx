'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      setUsername(localStorage.getItem('username') || 'User')
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative py-24 md:py-32 lg:py-40 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/3 top-1/4 w-[800px] h-[800px] bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-[128px] opacity-20"></div>
            <div className="absolute right-1/3 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-300 to-teal-300 rounded-full blur-[128px] opacity-20"></div>
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400">
                  Experience AI-Powered
                  <br />
                  Bias Detection
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Transform your thinking with our advanced AI technology
                </p>
              </div>
              {isLoggedIn ? (
                <Link href="/detect">
                  <Button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    Start Analyzing
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    Login to Start
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-800/30 backdrop-blur-lg">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400">
              Understanding Confirmation Bias
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-slate-800/50 border-purple-700/30">
                <CardHeader>
                  <CardTitle className="text-gray-100">What is Confirmation Bias?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Confirmation bias is the tendency to search for, interpret, favor, and recall information in a way that confirms or supports one's prior beliefs or values.</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-purple-700/30">
                <CardHeader>
                  <CardTitle className="text-gray-100">Why It Matters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Confirmation bias can lead to poor decision-making, reinforcement of false beliefs, and resistance to new ideas. Recognizing it is crucial for critical thinking.</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-purple-700/30">
                <CardHeader>
                  <CardTitle className="text-gray-100">How BiasSage Helps</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">BiasSage uses advanced AI to analyze your text and identify potential confirmation biases, helping you become more aware of your thought patterns.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400">
              How It Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Enter Your Text", description: "Input your writing or thoughts into our analysis box." },
                { title: "Click 'Analyze for Bias'", description: "Our AI model will process your text." },
                { title: "AI Assessment", description: "The system identifies potential confirmation biases." },
                { title: "Review Results", description: "Reflect on the analysis and gain insights into your thinking patterns." }
              ].map((step, index) => (
                <Card key={index} className="bg-slate-800/50 border-purple-700/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-100">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

