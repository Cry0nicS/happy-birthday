'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PlayButton from './PlayButton'
import DancingBear from "@/components/DancingBear";

export default function HeroSection() {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <div className="text-center z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
            <DancingBear />
            </motion.div>
            <motion.h1
                className="text-4xl md:text-6xl font-bold text-background mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                Happy birthday, Paul!
            </motion.h1>
            <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
    )
}

