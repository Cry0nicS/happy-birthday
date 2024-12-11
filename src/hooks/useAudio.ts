import { useRef, useEffect } from 'react';

export function useAudio(src: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(src);
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [src]);

    const play = () => {
        if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().catch(error => {
                if (error.name !== 'AbortError') {
                    console.error('Error playing audio:', error);
                }
            });
        }
    };

    const pause = () => {
        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
        }
    };

    return { play, pause, audioRef };
}