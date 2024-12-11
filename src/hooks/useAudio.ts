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
        audioRef.current?.play();
    };

    const pause = () => {
        audioRef.current?.pause();
    };

    return { play, pause, audioRef };
}
