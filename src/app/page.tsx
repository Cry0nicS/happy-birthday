'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import Snowfall from '@/components/Snowfall'
import PlayButton from '@/components/PlayButton'

export default function Home() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMusicPlaying, setIsMusicPlaying] = useState(false)

    return (
        <main
            className="min-h-screen flex flex-col items-center justify-center bg-[#1a202c] overflow-hidden relative">
            {isPlaying && <Snowfall/>}
            <div className="flex-grow flex items-center justify-center w-full">
                {isPlaying ? (
                    <HeroSection isMusicPlaying={isMusicPlaying} setIsMusicPlaying={setIsMusicPlaying}/>
                ) : (
                    <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
                )}
            </div>
            {isPlaying && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <PlayButton
                        isPlaying={isMusicPlaying}
                        setIsPlaying={setIsMusicPlaying}
                        label={isMusicPlaying ? "Pause" : "Play"}
                    />
                </div>
            )}
        </main>
    )
}

