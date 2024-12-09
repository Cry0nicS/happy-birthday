'use client'

import {JSX, useEffect, useState} from 'react'
import { motion } from 'framer-motion'

const Snowflake = ({ delay }: { delay: number }) => (
    <motion.div
        className="absolute text-white text-2xl"
        initial={{ top: "-5%", left: `${Math.random() * 100}%` }}
        animate={{
            top: "105%",
            left: `${Math.random() * 100}%`,
            rotate: 360
        }}
        transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
    >
        ❄
    </motion.div>
)

export default function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<JSX.Element[]>([])

    useEffect(() => {
        setSnowflakes(
            Array.from({ length: 50 }).map((_, i) => (
                <Snowflake key={i} delay={Math.random() * 20} />
            ))
        )
    }, [])

    return <>{snowflakes}</>
}

