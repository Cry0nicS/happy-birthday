'use client'

import { motion } from 'framer-motion'

const DancingPolarBear = () => {
    return (
        <motion.svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {/* Body */}
            <motion.ellipse
                cx="150"
                cy="180"
                rx="70"
                ry="80"
                fill="white"
                animate={{
                    scaleX: [1, 1.05, 1],
                    scaleY: [1, 0.95, 1],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Head */}
            <motion.circle
                cx="150"
                cy="100"
                r="60"
                fill="white"
                animate={{
                    rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Ears */}
            <circle cx="110" cy="60" r="15" fill="white" />
            <circle cx="190" cy="60" r="15" fill="white" />

            {/* Eyes */}
            <circle cx="130" cy="90" r="8" fill="black" />
            <circle cx="170" cy="90" r="8" fill="black" />
            <circle cx="132" cy="88" r="3" fill="white" />
            <circle cx="172" cy="88" r="3" fill="white" />

            {/* Nose */}
            <ellipse cx="150" cy="110" rx="12" ry="8" fill="black" />

            {/* Mouth */}
            <path d="M140 120 Q150 130 160 120" stroke="black" strokeWidth="3" fill="none" />

            {/* Arms */}
            <motion.path
                d="M80 180 Q 60 200, 40 180"
                stroke="white"
                strokeWidth="20"
                strokeLinecap="round"
                animate={{
                    d: ["M80 180 Q 60 200, 40 180", "M80 180 Q 60 160, 40 180"],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.path
                d="M220 180 Q 240 200, 260 180"
                stroke="white"
                strokeWidth="20"
                strokeLinecap="round"
                animate={{
                    d: ["M220 180 Q 240 200, 260 180", "M220 180 Q 240 160, 260 180"],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />

            {/* Legs */}
            <motion.ellipse
                cx="110"
                cy="260"
                rx="25"
                ry="20"
                fill="white"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse
                cx="190"
                cy="260"
                rx="25"
                ry="20"
                fill="white"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
        </motion.svg>
    )
}

export default DancingPolarBear
