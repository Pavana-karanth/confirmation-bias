import './globals.css'
import Header from '@/components/Header'
import { Footer } from '@/components/ui/footer'

export const metadata = {
  title: 'BiasSage - Confirmation Bias Detector',
  description: 'Detect confirmation bias in your text with BiasSage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-200 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

