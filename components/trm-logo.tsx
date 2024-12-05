'use client'

import Image from 'next/image'

interface TRMLogoProps {
  className?: string
}

export function TRMLogo({ className }: TRMLogoProps) {
  return (
    <Image
      src="/images/logo-light.svg"
      alt="TRM Toolbox Logo"
      width={24}
      height={24}
      className={`dark:invert ${className || ''}`}
    />
  )
}