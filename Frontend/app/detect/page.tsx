'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'

interface AnalysisResult {
  bias_level: string
  reason: string
  sentiment_score: number
}

export default function DetectPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    if (!loggedIn) {
      router.push('/login')
    }
  }, [router])

  if (!isLoggedIn) {
    return null // or a loading spinner
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://confirmation-bias.onrender.com/analyze-bias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: AnalysisResult = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to analyze text. Please try again.')
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto relative min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-gradient-to-r from-rose-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-200 to-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-purple-600">BiasSage Analysis</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-40 bg-white bg-opacity-80 backdrop-blur-sm border-2 border-rose-200 focus:border-purple-300 rounded-lg text-black"
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </form>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-red-100 rounded-lg shadow-lg border-2 border-red-200"
          >
            <p className="text-lg text-red-700">{error}</p>
          </motion.div>
        )}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg border-2 border-purple-200"
          >
            <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-purple-600">Analysis Result:</h2>
            <p className="text-lg text-gray-700 mb-2">Bias Level: {result.bias_level}</p>
            <p className="text-lg text-gray-700 mb-2">Reason: {result.reason}</p>
            <p className="text-lg text-gray-700">Sentiment Score: {result.sentiment_score.toFixed(2)}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
