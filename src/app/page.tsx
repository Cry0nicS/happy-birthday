'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import Snowfall from '@/components/Snowfall'
import PlayButton from '@/components/PlayButton'
import Image from 'next/image'

export default function Home() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMusicPlaying, setIsMusicPlaying] = useState(false)

    return (
        <main className="h-screen flex flex-col items-center justify-between bg-[#1a202c] overflow-hidden relative">
            {isPlaying && <Snowfall />}
            <div className="flex-grow flex items-center justify-center w-full">
                {isPlaying ? (
                    <HeroSection isMusicPlaying={isMusicPlaying} setIsMusicPlaying={setIsMusicPlaying} />
                ) : (
                    <div className="flex flex-col">
                        <div className="w-full flex justify-center mb-4 px-4">
                            <Image className="w-full lg:w-[900px]" src="/banner.webp" alt="Hi" width={900} height={514} priority={true} />
                        </div>
                        <div className="w-full flex justify-center">
                            <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
                        </div>
                    </div>
                )}
            </div>
            {isPlaying && (
                <div className="pb-8 w-full flex justify-center">
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

