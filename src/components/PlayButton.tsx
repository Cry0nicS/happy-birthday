'use client'

import { Button } from '@/components/ui/button'

interface PlayButtonProps {
    isPlaying: boolean
    setIsPlaying: (isPlaying: boolean) => void
    label?: string
}

export default function PlayButton({ isPlaying, setIsPlaying, label = "Play me" }: PlayButtonProps) {
    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <Button
            onClick={handleClick}
            className="bg-white text-[#1a202c] hover:bg-gray-200 px-6 py-3 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            {label}
        </Button>
    )
}

