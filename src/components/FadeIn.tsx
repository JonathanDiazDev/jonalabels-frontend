import { type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

type FadeInProps = {
  children?: ReactNode
  className?: string
  when?: 'load' | 'view'
  delay?: number
  duration?: number
  y?: number
  once?: boolean
}

export default function FadeIn({
  children,
  when = 'view',
  delay = 0,
  duration = 0.55,
  y = 22,
  once = true,
  className,
}: FadeInProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const motionProps =
    when === 'load'
      ? {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
        }
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once, amount: 0.15 },
        }

  return (
    <motion.div
      className={className}
      {...motionProps}
      transition={{ duration, delay, ease: 'easeOut' as const }}
    >
      {children}
    </motion.div>
  )
}

const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

type StaggerProps = {
  children?: ReactNode
  className?: string
  when?: 'load' | 'view'
  stagger?: number
  once?: boolean
}

export function Stagger({
  children,
  when = 'view',
  stagger = 0.1,
  once = true,
  className,
}: StaggerProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const motionProps =
    when === 'load'
      ? { initial: 'hidden' as const, animate: 'visible' as const }
      : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once, amount: 0.12 } }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      custom={stagger}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children?: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

export function MotionLinkButton({ children, className, ...rest }: LinkProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <Link className={className} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' as const }}
    >
      <Link className={className} {...rest}>
        {children}
      </Link>
    </motion.div>
  )
}
