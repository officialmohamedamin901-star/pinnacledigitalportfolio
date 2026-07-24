import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';

interface TiltGlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  glowColor?: string;
}

export const TiltGlassCard: React.FC<TiltGlassCardProps> = ({
  children,
  className = '',
  onClick,
  id,
  tiltMaxAngleX = 12,
  tiltMaxAngleY = 12,
  glowColor = 'rgba(59, 130, 246, 0.25)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 250 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltMaxAngleX, -tiltMaxAngleX]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltMaxAngleY, tiltMaxAngleY]), springConfig);

  const mouseXPercent = useTransform(mouseX, [0, 1], [0, 100]);
  const mouseYPercent = useTransform(mouseY, [0, 1], [0, 100]);

  const shineBg = useMotionTemplate`radial-gradient(600px circle at ${mouseXPercent}% ${mouseYPercent}%, ${glowColor}, transparent 50%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const currentMouseX = (e.clientX - rect.left) / rect.width;
    const currentMouseY = (e.clientY - rect.top) / rect.height;

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className={`relative group rounded-3xl glass-panel-glow overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* 3D Specular Highlight layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: shineBg,
        }}
      />

      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};
