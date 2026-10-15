
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.075, delayChildren: 0.18 },
  },
};

const stillContainer: Variants = {
  hidden: {},
  visible: {},
};

const word: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stillWord: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
};

export default function HeroHeading() {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? stillWord : word;

  return (
    <motion.h1
      className="hero-heading"
      variants={reduceMotion ? stillContainer : container}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
    >
      <motion.span className="hero-word" variants={variants}>
        Digital
      </motion.span>
      {" "}
      <motion.span className="hero-word" variants={variants}>
        Marketing
      </motion.span>

      <br />

      <motion.span className="hero-word" variants={variants}>
        Agency
      </motion.span>
      {" "}
      <motion.span className="hero-word" variants={variants}>
        for
      </motion.span>

      <br />

      <motion.span
        className="hero-word accent-text hero-lime-word"
        variants={variants}
      >
        Startup
      </motion.span>
      {" "}
      <motion.span
        className="hero-word accent-text hero-lime-word"
        variants={variants}
      >
        Growth
      </motion.span>
    </motion.h1>
  );
}
