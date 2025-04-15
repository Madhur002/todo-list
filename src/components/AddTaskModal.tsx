'use client'

import { useState } from 'react'
import { useTasks } from '@/context/TaskContext'
import { useProjects } from '@/context/ProjectContext'
import { Calendar, Flag, X } from 'lucide-react'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(4)
  const [projectId, setProjectId] = useState<string | undefined>()
  const [dueDate, setDueDate] = useState<string>('')
  
  const { addTask } = useTasks()
  const { projects } = useProjects()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addTask({
        title: title.trim(),
        completed: false,
        priority,
        projectId,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      })
      setTitle('')
      setPriority(4)
      setProjectId(undefined)
      setDueDate('')
      onClose()
    }
  }

  const getPriorityColor = (p: number) => {
    switch (p) {
      case 1: return '#FF5252' // bright red
      case 2: return '#FF9800' // bright orange
      case 3: return '#2196F3' // bright blue
      default: return '#9E9E9E' // medium gray
    }
  }

  const getPriorityLabel = (p: number) => {
    switch (p) {
      case 1: return 'High'
      case 2: return 'Medium'
      case 3: return 'Low'
      default: return 'None'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-background p-6 rounded-lg w-full max-w-md shadow-xl border border-border/50">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Add Task</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-sidebar transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-sidebar focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder-text-secondary/70 text-text-primary"
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-text-secondary">
              Project
            </label>
            <select
              value={projectId || ''}
              onChange={(e) => setProjectId(e.target.value || undefined)}
              className="w-full p-3 rounded-lg border border-border bg-sidebar focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary"
            >
              <option value="">No Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-5 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-text-secondary">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={18} />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-border bg-sidebar focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">
                Priority
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`p-2 rounded-lg transition-colors ${
                      priority === p 
                        ? 'bg-sidebar/80 ring-2 ring-primary/30 shadow-sm' 
                        : 'hover:bg-sidebar/50'
                    }`}
                    title={getPriorityLabel(p)}
                  >
                    <Flag 
                      style={{ color: getPriorityColor(p) }} 
                      size={18} 
                      fill={priority === p ? getPriorityColor(p) : 'none'}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg hover:bg-sidebar transition-colors font-medium text-text-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
