'use client'

import { useRef } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa'
import { CVData } from './CVBuilder'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface CVPreviewProps {
  cvData: CVData
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const cvRef = useRef<HTMLDivElement>(null)

  const downloadPDF = async () => {
    if (!cvRef.current) return

    const canvas = await html2canvas(cvRef.current, {
      scale: 2,
      useCORS: true,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 0

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
    pdf.save('السيرة_الذاتية.pdf')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={downloadPDF} className="btn-primary flex items-center gap-2">
          <FaDownload />
          تحميل PDF
        </button>
      </div>

      <div
        ref={cvRef}
        className="bg-white shadow-2xl rounded-lg overflow-hidden"
        style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', padding: '40px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-8 rounded-lg mb-8">
          <h1 className="text-4xl font-bold mb-4">{cvData.personalInfo.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {cvData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope />
                <span>{cvData.personalInfo.email}</span>
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <FaPhone />
                <span>{cvData.personalInfo.phone}</span>
              </div>
            )}
            {cvData.personalInfo.address && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>{cvData.personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-600 mb-4 border-b-2 border-primary-500 pb-2">
              المهارات
            </h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-600 mb-4 border-b-2 border-primary-500 pb-2">
              الخبرات العملية
            </h2>
            <div className="space-y-6">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="border-r-4 border-primary-500 pr-4">
                  <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                  <p className="text-accent-600 font-semibold mb-2">
                    {exp.company} {exp.period && `- ${exp.period}`}
                  </p>
                  {exp.description && (
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-accent-600 mb-4 border-b-2 border-accent-500 pb-2">
              التعليم
            </h2>
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={index} className="border-r-4 border-accent-500 pr-4">
                  <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">
                    {edu.institution} {edu.year && `- ${edu.year}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {cvData.languages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-primary-600 mb-4 border-b-2 border-primary-500 pb-2">
              اللغات
            </h2>
            <div className="flex flex-wrap gap-2">
              {cvData.languages.map((language, index) => (
                <span
                  key={index}
                  className="bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

