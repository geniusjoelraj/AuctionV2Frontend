import React, { useState, useEffect, CSSProperties, ReactNode } from 'react';

interface CircularRevealProps {
  /** Content to reveal */
  children: ReactNode;
  /** Animation duration in milliseconds (default: 1800) */
  duration?: number;
  /** Origin point of the circle (default: '50% 0%' - top center)
   * Options: '50% 0%' (top center), '50% 50%' (center), 
   * '0% 0%' (top left), '100% 0%' (top right), etc.
   */
  origin?: string;
  /** CSS easing function (default: 'cubic-bezier(0.4, 0, 0.2, 1)') */
  easing?: string;
  /** Control when animation starts (default: true on mount) */
  trigger?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CircularReveal Component
 * 
 * A circular reveal animation that expands from a point on the screen
 */
const CircularReveal: React.FC<CircularRevealProps> = ({
  children,
  duration = 1800,
  origin = '50% 0%',
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  trigger = true,
  onComplete,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (trigger) {
      setIsAnimating(true);

      if (onComplete) {
        const timer = setTimeout(() => {
          onComplete();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [trigger, duration, onComplete]);

  const keyframesStyle = `
    @keyframes circularReveal-${origin.replace(/[^a-z0-9]/gi, '')} {
      0% {
        clip-path: circle(0% at ${origin});
      }
      100% {
        clip-path: circle(150% at ${origin});
      }
    }
  `;

  const animationStyle: CSSProperties = {
    animation: isAnimating
      ? `circularReveal-${origin.replace(/[^a-z0-9]/gi, '')} ${duration}ms ${easing} forwards`
      : 'none',
    clipPath: !isAnimating ? `circle(0% at ${origin})` : undefined
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        style={animationStyle}
        className={className}
      >
        {children}
      </div>
    </>
  );
};

export default CircularReveal;
