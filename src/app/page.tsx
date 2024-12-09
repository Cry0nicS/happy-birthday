import HeroSection from '@/components/HeroSection'
import Snowfall from '@/components/Snowfall'

export default function Home() {
  return (
      <main className="min-h-screen flex items-center justify-center bg-[#1a202c] overflow-hidden relative">
          <Snowfall/>
          <HeroSection/>
      </main>
  )
}

