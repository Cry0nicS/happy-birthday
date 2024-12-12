'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DancingPolarBear from './DancingPolarBear'
import { useAudio } from '@/hooks/useAudio'
import {lyrics} from "@/lib/utils";
import LyricsDisplay from "@/components/LyricsDisplay";

const words = ['Happy', 'Birthday!', '🎂']

interface HeroSectionProps {
    isMusicPlaying: boolean;
    setIsMusicPlaying: (isPlaying: boolean) => void;
    setIsPlaying: (isPlaying: boolean) => void;
}

export default function HeroSection({ isMusicPlaying, setIsMusicPlaying, setIsPlaying }: HeroSectionProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(-1)
    const [showBear, setShowBear] = useState(false)
    const { play, pause, audioRef } = useAudio('/bday-song.mp3')

    useEffect(() => {
        setIsMusicPlaying(true);

        const wordTimers = words.map((_, index) => {
            return setTimeout(() => setCurrentWordIndex(index), (index + 1) * 1000)
        })

        const bearTimer = setTimeout(() => {
            setShowBear(true)
        }, (words.length + 1) * 1000)

        return () => {
            wordTimers.forEach(clearTimeout)
            clearTimeout(bearTimer)
        }
    }, [setIsMusicPlaying])

    useEffect(() => {
        if (isMusicPlaying) {
            play()
        } else {
            pause()
        }
    }, [isMusicPlaying, play, pause])

    useEffect(() => {
        if (!audioRef.current) return;

        const handleEnded = () => {
            setIsPlaying(false);
        };

        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [audioRef, setIsPlaying]);

    return (
        <div className="text-center z-10 relative h-full w-full flex flex-col items-center justify-center">
            <div className="h-24">
                <AnimatePresence>
                    {words.map((word, index) => (
                        currentWordIndex >= index && (
                            <motion.span
                                key={word}
                                className="text-3xl md:text-6xl font-bold text-white mr-4"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {word}
                            </motion.span>
                        )
                    ))}
                </AnimatePresence>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 300 }}
                animate={showBear ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
            >
                <DancingPolarBear />
            </motion.div>
            <LyricsDisplay audioRef={audioRef} lyrics={lyrics} />
        </div>
    )
}