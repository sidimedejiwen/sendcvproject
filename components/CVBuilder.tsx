'use client'

import { useState } from 'react'
import CVForm from './CVForm'
import CVPreview from './CVPreview'
import { FaEye, FaEdit } from 'react-icons/fa'

interface CVData {
  personalInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  skills: string[]
  experience: Array<{
    title: string
    company: string
    period: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  languages: string[]
}

interface CVBuilderProps {
  userName: string
}

export default function CVBuilder({ userName }: CVBuilderProps) {
  const [viewMode, setViewMode] = useState<'form' | 'preview'>('form')
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      name: userName,
      email: '',
      phone: '',
      address: '',
    },
    skills: [],
    experience: [],
    education: [],
    languages: [],
  })

  const updateCVData = (data: Partial<CVData>) => {
    setCvData((prev: CVData) => ({ ...prev, ...data }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setViewMode('form')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            viewMode === 'form'
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FaEdit />
          إدخال البيانات
        </button>
        <button
          onClick={() => setViewMode('preview')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            viewMode === 'preview'
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FaEye />
          معاينة السيرة الذاتية
        </button>
      </div>

      {viewMode === 'form' ? (
        <CVForm cvData={cvData} updateCVData={updateCVData} />
      ) : (
        <CVPreview cvData={cvData} />
      )}
    </div>
  )
}

export type { CVData }

