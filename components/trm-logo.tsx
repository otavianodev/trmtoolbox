'use client'

import { useTheme } from 'next-themes'

interface LogoProps {
  className?: string
}

export function TRMLogo({ className }: LogoProps) {
  const { resolvedTheme } = useTheme()

  return (
    <svg 
      viewBox="0 0 64 64" 
      className={className}
      width="64"
      height="64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11h64v14L32 53 0 25V11zm0 21l32 28 32-28v7L32 67 0 39v-7z"
        fill="currentColor"
      />
    </svg>
  )
}