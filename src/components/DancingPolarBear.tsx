/**
 * PolarBearsDance Component
 *
 * This component renders an animated scene with one or two polar bears, using Framer Motion for animations.
 *
 * Timeline:
 * - 0–10 seconds: A single polar bear dances ("solo" mode).
 * - After 10 seconds: A second polar bear enters with a birthday cake ("greeting" mode). Both bears face each other, and the second bear holds the cake and displays a "Happy Birthday" message.
 * - After 3 seconds of greeting: The cake disappears, and the scene transitions into a "duet" mode.
 *   - In duet mode, both bears dance more energetically.
 *   - The second bear holds a microphone close to its mouth (no arm animation on the left arm) and appears to sing (mouth open).
 *
 * Props:
 * - None (This component manages its own internal timing and state.)
 *
 * Dependencies:
 * - "framer-motion" for animations.
 * - "react" and "react-dom" for rendering.
 *
 * How It Works:
 * - The component uses React state and useEffect hooks to manage timing:
 *   - Starts in "solo" mode.
 *   - After 10 seconds, sets mode to "greeting" and shows the second bear.
 *   - After 3 more seconds, transitions to "duet" mode.
 *
 * - The DancingPolarBear subcomponent:
 *   - Accepts a `danceMode` ("solo", "greeting", or "duet") and optionally `isSecondBear` and `flipped` props.
 *   - Animates different parts of the polar bear depending on the mode.
 *   - In duet mode for the second bear, the left arm is static, holding a microphone, and the mouth is more open, simulating singing.
 *
 * Customization:
 * - Adjust paths, coordinates, and transitions to achieve the desired look.
 * - Change timing or add more modes as needed.
 */

'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type DanceMode = 'solo' | 'greeting' | 'duet';

interface DancingPolarBearProps {
    danceMode: DanceMode;
    xOffset?: number;
    flipped?: boolean;
    isSecondBear?: boolean;
}

const DancingPolarBear: React.FC<DancingPolarBearProps> = ({
                                                               danceMode,
                                                               xOffset = 0,
                                                               flipped = false,
                                                               isSecondBear = false
                                                           }) => {

    // Animations for body movement depending on mode
    const bodyAnimation =
        danceMode === 'solo'
            ? { animate: { y: [0, -10, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
            : danceMode === 'greeting'
                ? { animate: { y: [0, -5, 0, 5, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
                : { animate: { y: [0, -20, 0, 20, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } };

    const bodyScaleAnimation =
        danceMode === 'solo'
            ? { animate: { scaleX: [1, 1.05, 1], scaleY: [1, 0.95, 1] }, transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } }
            : danceMode === 'greeting'
                ? { animate: { scaleX: [1, 1.03, 1], scaleY: [1, 0.97, 1] }, transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } }
                : { animate: { scaleX: [1, 1.1, 1], scaleY: [1, 0.9, 1] }, transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } };

    const headAnimation =
        danceMode === 'solo'
            ? { animate: { rotate: [0, 5, 0, -5, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
            : danceMode === 'greeting'
                ? { animate: { rotate: [0, 3, 0, -3, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
                : { animate: { rotate: [0, 10, 0, -10, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } };

    // Mouth shape: more open if second bear singing in duet
    const mouthPath = isSecondBear && danceMode === 'duet'
        ? "M140 120 Q150 150 160 120"
        : "M140 120 Q150 130 160 120";

    // Arm configurations
    const leftArmIsStatic = isSecondBear && danceMode === 'duet';

    // Define arm paths as arrays of strings to fix TS2322 and always provide a string for d.
    // SOLO, GREETING, DUET (animated) states have two-path arrays; STATIC (with microphone) is a single path.
    let leftArmPaths: string[];
    if (leftArmIsStatic) {
        // Position the arm so it holds the microphone below the mouth.
        // Mouth ~120-130, let's place arm end around (130,125) and microphone below that.
        leftArmPaths = ["M80 180 Q115 190, 130 185"];
    } else {
        if (danceMode === 'solo') {
            leftArmPaths = ["M80 180 Q 60 200, 40 180", "M80 180 Q 60 160, 40 180"];
        } else if (danceMode === 'greeting') {
            leftArmPaths = ["M80 180 Q 60 180, 40 180", "M80 180 Q 60 170, 40 180"];
        } else { // duet (animated)
            leftArmPaths = ["M80 180 Q 60 220, 40 180", "M80 180 Q 60 140, 40 180"];
        }
    }

    let rightArmPaths: string[];
    if (danceMode === 'solo') {
        rightArmPaths = ["M220 180 Q 240 200, 260 180", "M220 180 Q 240 160, 260 180"];
    } else if (danceMode === 'greeting') {
        rightArmPaths = ["M220 180 Q 240 180, 260 180", "M220 180 Q 240 170, 260 180"];
    } else { // duet
        rightArmPaths = ["M220 180 Q 240 220, 260 180", "M220 180 Q 240 140, 260 180"];
    }

    const legAnimation =
        danceMode === 'solo'
            ? [0, -5, 0]
            : danceMode === 'greeting'
                ? [0, -2, 0, 2, 0]
                : [0, -10, 0, 10, 0];

    // Show cake if second bear and greeting mode
    const showCake = isSecondBear && danceMode === 'greeting';
    // Show microphone if second bear and duet mode
    const showMicrophone = isSecondBear && danceMode === 'duet';

    return (
        <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                x: xOffset,
                transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',
                originX: "50%",
                originY: "50%"
            }}
            {...bodyAnimation}
        >
            {/* Body */}
            <motion.ellipse cx="150" cy="180" rx="70" ry="80" fill="white" {...bodyScaleAnimation} />

            {/* Head */}
            <motion.circle cx="150" cy="100" r="60" fill="white" {...headAnimation} />

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
            <path d={mouthPath} stroke="black" strokeWidth="3" fill="none" />

            {/* Left Arm */}
            {leftArmIsStatic ? (
                // Static arm with microphone: draw a black outline (thicker), then white arm on top
                <>
                    <path
                        d={leftArmPaths[0]}
                        stroke="black"
                        strokeWidth={24}
                        strokeLinecap="round"
                    />
                    <path
                        d={leftArmPaths[0]}
                        stroke="white"
                        strokeWidth={20}
                        strokeLinecap="round"
                    />
                </>
            ) : (
                <motion.path
                    d={leftArmPaths[0]}
                    stroke="white"
                    strokeWidth="20"
                    strokeLinecap="round"
                    animate={{ d: leftArmPaths }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            {/* Right Arm */}
            <motion.path
                d={rightArmPaths[0]}
                stroke="white"
                strokeWidth="20"
                strokeLinecap="round"
                animate={{ d: rightArmPaths }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Legs */}
            <motion.ellipse
                cx="110"
                cy="260"
                rx="25"
                ry="20"
                fill="white"
                animate={{ y: legAnimation }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse
                cx="190"
                cy="260"
                rx="25"
                ry="20"
                fill="white"
                animate={{ y: legAnimation }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {showCake && (
                <g>
                    {/* Cake in right hand area */}
                    <motion.rect
                        x="200"
                        y="150"
                        width="30"
                        height="20"
                        fill="pink"
                        stroke="brown"
                        strokeWidth="2"
                        rx="5"
                        ry="5"
                    />
                    {/* Candle */}
                    <motion.rect
                        x="213"
                        y="140"
                        width="4"
                        height="10"
                        fill="yellow"
                    />
                    {/* Flame */}
                    <motion.circle
                        cx="215"
                        cy="137"
                        r="3"
                        fill="orange"
                    />
                    {/* Happy Birthday text */}
                    <motion.text
                        x="215"
                        y="130"
                        textAnchor="middle"
                        fill="white"
                        style={{ fontSize: "15px", fontWeight: "bold", textShadow: "2px 2px 4px black"}}
                    >
                        Happy Birthday
                    </motion.text>
                </g>
            )}

            {showMicrophone && (
                <g>
                    {/* Microphone below the mouth:
              The arm ends at (130,125). 130 185
              Place the mic line going downward from arm end:
              from (130,125) down to (130,135), and mic head at (130,137).
          */}
                    <line
                        x1="140" y1="155"
                        x2="140" y2="175"
                        stroke="black"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />
                    <circle
                        cx="140"
                        cy="145"
                        r="8"
                        fill="black"
                    />
                </g>
            )}
        </motion.svg>
    );
};

const PolarBearsDance: React.FC = () => {
    const [showSecondBear, setShowSecondBear] = useState(false);
    const [danceMode, setDanceMode] = useState<DanceMode>('solo');

    useEffect(() => {
        const timer = setTimeout(() => {
            // After 10 seconds, greet
            setShowSecondBear(true);
            setDanceMode('greeting');
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    // After greeting for 3 seconds, switch to duet
    useEffect(() => {
        let greetingTimer: NodeJS.Timeout;
        if (danceMode === 'greeting') {
            greetingTimer = setTimeout(() => {
                setDanceMode('duet');
            }, 3000);
        }
        return () => {
            if (greetingTimer) clearTimeout(greetingTimer);
        };
    }, [danceMode]);

    return (
        <div className="flex flex-row lg:flex-row justify-center items-center w-full h-full">
            <div className="w-full max-w-[200px] lg:max-w-[300px] aspect-square">
                <DancingPolarBear danceMode={danceMode} />
            </div>

            {showSecondBear && (
                <motion.div
                    className="w-full max-w-[200px] lg:max-w-[300px] aspect-square"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    {/* Second Bear: Flipped to face the first bear, isSecondBear = true */}
                    <DancingPolarBear
                        danceMode={danceMode}
                        flipped={true}
                        isSecondBear={true}
                    />
                </motion.div>
            )}
        </div>
    );
};

export default PolarBearsDance;

