'use client'

import { useState } from 'react'
import { useProjects } from '@/context/ProjectContext'

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

const COLORS = [
  '#ff4b4b',
  '#4b4bff',
  '#4bff4b',
  '#ffd700',
  '#ff69b4',
  '#8a2be2',
  '#00ced1',
]

export default function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const [projectName, setProjectName] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const { addProject } = useProjects()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (projectName.trim()) {
      addProject(projectName.trim(), selectedColor)
      setProjectName('')
      setSelectedColor(COLORS[0])
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ backgroundColor: 'var(--background)', padding: '1.5rem', borderRadius: '0.5rem' }} className="w-full max-w-md">
        <h2 style={{ color: 'var(--text)', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Add Project</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text)' }}>
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                backgroundColor: 'var(--sidebar-background)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none'
              }}
              placeholder="Enter project name"
              autoFocus
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text)' }}>
              Color
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '9999px',
                    backgroundColor: color,
                    boxShadow: selectedColor === color ? '0 0 0 2px var(--primary), 0 0 0 4px #ffffff' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                color: 'var(--text)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sidebar-background)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!projectName.trim()}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                opacity: projectName.trim() ? 1 : 0.5,
                transition: 'opacity 0.2s, background-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(219, 76, 63, 0.9)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
