'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import CVBuilder from '@/components/CVBuilder'
import { signOut } from 'next-auth/react'

export default function BuilderPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            مرحباً، {session.user?.name}
          </h1>
          <button
            onClick={() => signOut()}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            تسجيل الخروج
          </button>
        </div>
        <CVBuilder userName={session.user?.name || ''} />
      </div>
    </div>
  )
}

