// ✅ PINDAHKAN KE: app/dashboard/_components/animated-number.tsx
import React, { useState, useEffect, useRef } from 'react';

export const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number>(0);
  const startValue = useRef<number>(0);
  const targetValue = useRef<number>(value);
  const animationFrame = useRef<number>(0);

  useEffect(() => {
    startValue.current = displayValue;
    targetValue.current = value;
    startTime.current = 0;
    const animate = (time: number) => {
      if (!startTime.current) startTime.current = time;
      const progress = (time - startTime.current) / 1000;
      if (progress < 1) {
        const ease = 1 - Math.pow(2, -10 * progress);
        const current = startValue.current + (targetValue.current - startValue.current) * ease;
        setDisplayValue(Math.floor(current));
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue.current);
      }
    };
    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [value]);

  return <span>{displayValue}</span>;
};