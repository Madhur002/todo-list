'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Task {
  id: string
  title: string
  completed: boolean
  projectId?: string
  dueDate?: Date
  priority: number
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id'>) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  editTask: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void
  searchTasks: (query: string) => Task[]
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      completed: false,
      priority: 1,
      dueDate: new Date(),
    },
    {
      id: '2',
      title: 'Review code changes',
      completed: false,
      priority: 2,
    },
  ])

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    ))
  }

  const searchTasks = (query: string) => {
    if (!query.trim()) return []
    return tasks.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, editTask, searchTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}
