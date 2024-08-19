import { Variant } from 'framer-motion';

export const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

export const moveIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 } as Variant,
};