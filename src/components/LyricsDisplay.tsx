'use client';

import { useState, useEffect } from 'react';

interface LyricsDisplayProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    lyrics: string;
}

interface LyricLine {
    time: number;
    text: string;
}

export default function LyricsDisplay({ audioRef, lyrics }: LyricsDisplayProps) {
    const [currentLyric, setCurrentLyric] = useState<string>('');

    // Parse lyrics into time and text pairs
    const parseLyrics = (lyrics: string): LyricLine[] => {
        return lyrics
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
                const match = line.match(/^\[(\d+):(\d+)\.(\d+)\]\s*(.*)$/);
                if (match) {
                    const [, min, sec, ms, text] = match;
                    const time = parseInt(min) * 60 + parseInt(sec) + parseInt(ms) / 1000;
                    return { time, text };
                }
                return { time: 0, text: '' }; // fallback
            })
            .filter(line => line.text !== ''); // Remove any empty lines
    };

    const lyricLines = parseLyrics(lyrics);

    useEffect(() => {
        if (!audioRef.current) return;

        const updateLyrics = () => {
            const currentTime = audioRef.current!.currentTime;
            const currentLine = lyricLines.find(
                (line, index) =>
                    currentTime >= line.time &&
                    (index === lyricLines.length - 1 || currentTime < lyricLines[index + 1].time)
            );
            setCurrentLyric(currentLine?.text || '');
        };

        audioRef.current.addEventListener('timeupdate', updateLyrics);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateLyrics);
            }
        };
    }, [audioRef, lyricLines]);

    return (
        <div className="text-center text-white pt-20 md:pt-32 xl:pt-40">
            <p className="text-lg md:text-2xl font-semibold">{currentLyric}</p>
        </div>
    );
}
