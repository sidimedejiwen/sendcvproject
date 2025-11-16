'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaFacebook, FaGithub, FaFileAlt, FaUser } from 'react-icons/fa'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/builder')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <FaFileAlt className="mx-auto text-6xl text-primary-500 mb-4" />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            أنشئ سيرتك الذاتية
          </h1>
          <p className="text-xl text-gray-600">
            واجهة بسيطة وسلسة لإنشاء سيرة ذاتية احترافية بألوان جذابة
          </p>
        </div>

        <div className="card max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            تسجيل الدخول
          </h2>
          <p className="text-gray-600 mb-6">
            سجل الدخول لبدء إنشاء سيرتك الذاتية
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => signIn('test-user', { callbackUrl: '/builder' })}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaUser className="text-xl" />
              تسجيل الدخول كـ مستخدم تجريبي
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو</span>
              </div>
            </div>
            
            <button
              onClick={() => signIn('facebook')}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaFacebook className="text-xl" />
              تسجيل الدخول عبر Facebook
            </button>
            
            <button
              onClick={() => signIn('github')}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaGithub className="text-xl" />
              تسجيل الدخول عبر GitHub
            </button>
          </div>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>بعد تسجيل الدخول، سيظهر اسمك على سيرتك الذاتية</p>
        </div>
      </div>
    </div>
  )
}

