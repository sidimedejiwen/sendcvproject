'use client'

import { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { CVData } from './CVBuilder'

interface CVFormProps {
  cvData: CVData
  updateCVData: (data: Partial<CVData>) => void
}

export default function CVForm({ cvData, updateCVData }: CVFormProps) {
  const [newSkill, setNewSkill] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  const addSkill = () => {
    if (newSkill.trim()) {
      updateCVData({
        skills: [...cvData.skills, newSkill.trim()],
      })
      setNewSkill('')
    }
  }

  const removeSkill = (index: number) => {
    updateCVData({
      skills: cvData.skills.filter((_, i) => i !== index),
    })
  }

  const addLanguage = () => {
    if (newLanguage.trim()) {
      updateCVData({
        languages: [...cvData.languages, newLanguage.trim()],
      })
      setNewLanguage('')
    }
  }

  const removeLanguage = (index: number) => {
    updateCVData({
      languages: cvData.languages.filter((_, i) => i !== index),
    })
  }

  const addExperience = () => {
    updateCVData({
      experience: [
        ...cvData.experience,
        { title: '', company: '', period: '', description: '' },
      ],
    })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...cvData.experience]
    updated[index] = { ...updated[index], [field]: value }
    updateCVData({ experience: updated })
  }

  const removeExperience = (index: number) => {
    updateCVData({
      experience: cvData.experience.filter((_, i) => i !== index),
    })
  }

  const addEducation = () => {
    updateCVData({
      education: [
        ...cvData.education,
        { degree: '', institution: '', year: '' },
      ],
    })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...cvData.education]
    updated[index] = { ...updated[index], [field]: value }
    updateCVData({ education: updated })
  }

  const removeEducation = (index: number) => {
    updateCVData({
      education: cvData.education.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* المعلومات الشخصية */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-primary-500 pb-2">
          المعلومات الشخصية
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">الاسم</label>
            <input
              type="text"
              value={cvData.personalInfo.name}
              onChange={(e) =>
                updateCVData({
                  personalInfo: { ...cvData.personalInfo, name: e.target.value },
                })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) =>
                updateCVData({
                  personalInfo: { ...cvData.personalInfo, email: e.target.value },
                })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">الهاتف</label>
            <input
              type="tel"
              value={cvData.personalInfo.phone}
              onChange={(e) =>
                updateCVData({
                  personalInfo: { ...cvData.personalInfo, phone: e.target.value },
                })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">العنوان</label>
            <input
              type="text"
              value={cvData.personalInfo.address}
              onChange={(e) =>
                updateCVData({
                  personalInfo: { ...cvData.personalInfo, address: e.target.value },
                })
              }
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* المهارات */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-accent-500 pb-2">
          المهارات
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              placeholder="أضف مهارة جديدة"
              className="input-field flex-1"
            />
            <button
              onClick={addSkill}
              className="btn-primary px-4"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="text-primary-700 hover:text-primary-900"
                >
                  <FaTrash className="text-sm" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* الخبرات */}
      <div className="card lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-primary-500 pb-2">
            الخبرات العملية
          </h2>
          <button onClick={addExperience} className="btn-primary">
            <FaPlus className="inline ml-2" />
            إضافة خبرة
          </button>
        </div>
        <div className="space-y-6">
          {cvData.experience.map((exp, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg p-4 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">المسمى الوظيفي</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الشركة</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الفترة</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => updateExperience(index, 'period', e.target.value)}
                    placeholder="مثال: 2020 - 2023"
                    className="input-field"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">الوصف</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows={3}
                  className="input-field"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* التعليم */}
      <div className="card lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-accent-500 pb-2">
            التعليم
          </h2>
          <button onClick={addEducation} className="btn-secondary">
            <FaPlus className="inline ml-2" />
            إضافة مؤهل
          </button>
        </div>
        <div className="space-y-4">
          {cvData.education.map((edu, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-2">الدرجة</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">المؤسسة</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">السنة</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* اللغات */}
      <div className="card lg:col-span-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-primary-500 pb-2">
          اللغات
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addLanguage()}
              placeholder="أضف لغة جديدة"
              className="input-field flex-1"
            />
            <button onClick={addLanguage} className="btn-primary px-4">
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.languages.map((language, index) => (
              <span
                key={index}
                className="bg-accent-100 text-accent-700 px-4 py-2 rounded-full flex items-center gap-2"
              >
                {language}
                <button
                  onClick={() => removeLanguage(index)}
                  className="text-accent-700 hover:text-accent-900"
                >
                  <FaTrash className="text-sm" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

