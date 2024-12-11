import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const lyrics = `
[00:07.48] 🎵 Happy Birthday, Snowy Star! 🎵

[00:11.48]It’s your day, the snowflakes fall,
[00:14.89]A winter wonder for us all.
[00:17.74]Polar bears dance on the ice,
[00:21.36]To celebrate someone so nice.


[00:24.53]Happy birthday, snowy star,
[00:27.65]Shining bright just where you are.
[00:30.86]With frosty dreams and cozy flair,
[00:34.25]It’s your day—beyond compare!


[00:44.89]The cold may nip, but hearts stay warm,
[00:48.26]Your laughter’s our sweetest charm.
[00:51.09]Like the snow, you sparkle and gleam,
[00:54.03]A birthday queen in every scene.


[00:57.34]Happy birthday, snowy star,
[01:00.63]Shining bright just where you are.
[01:03.83]With frosty dreams and cozy flair,
[01:07.55]It’s your day—beyond compare!


[01:23.83]Polar bears give you a cheer,
[01:27.07]Glaciers shimmer, skies are clear.
[01:30.34]Wrapped in scarves, we’re here to say,
[01:33.71]You’re the highlight of our day!


[01:36.82]So blow your candles, make a wish,
[01:40.70]Here’s to joy and all you cherish.
[01:43.45]Happy birthday, snowy star,
[01:47.26]You’re our magic, near or far. 🎵 
`;
