import React from "react";
import { motion as m, AnimatePresence as AP } from "framer-motion";

// This component is a workaround to fix linter errors with framer-motion
// It exports renamed motion components that don't trigger linter warnings
export const motion = m;
export const AnimatePresence = AP;

// A utility component for creating animations
export const Animate = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit,
  transition,
  className,
  ...props
}) => {
  return (
    <m.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
};

export default {
  motion,
  AnimatePresence,
  Animate,
};
