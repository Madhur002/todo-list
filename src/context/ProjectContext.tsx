'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Project {
  id: string
  name: string
  color: string
}

interface ProjectContextType {
  projects: Project[]
  addProject: (name: string, color: string) => void
  deleteProject: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Personal', color: '#ff4b4b' },
    { id: '2', name: 'Work', color: '#4b4bff' },
  ])

  const addProject = (name: string, color: string) => {
    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      color,
    }
    setProjects([...projects, newProject])
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}
