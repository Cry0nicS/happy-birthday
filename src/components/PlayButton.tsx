'use client'

import { Button } from '@/components/ui/button'
import { useAudio } from '@/hooks/useAudio'

interface PlayButtonProps {
    isPlaying: boolean
    setIsPlaying: (isPlaying: boolean) => void
}

export default function PlayButton({ isPlaying, setIsPlaying }: PlayButtonProps) {
    const { play, pause } = useAudio('/happy_birthday_song.mp3')

    const handleClick = () => {
        if (isPlaying) {
            pause()
        } else {
            play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <Button
            onClick={handleClick}
            className="bg-[#0288D1] hover:bg-[#0277BD] text-white px-6 py-3 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            {isPlaying ? 'Pause' : 'Play me'}
        </Button>
    )
}

