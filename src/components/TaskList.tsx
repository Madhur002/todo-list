'use client'

import { Check, Calendar, Flag, MoreHorizontal, Trash2, Edit, X, Save } from 'lucide-react'
import { useTasks } from '@/context/TaskContext'
import { format } from 'date-fns'
import { useState } from 'react'
import type { Task } from '@/context/TaskContext'

export default function TaskList() {
  const { tasks, toggleTask, deleteTask, editTask } = useTasks()
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<{
    title: string;
    priority: number;
    dueDate?: Date;
  }>({
    title: '',
    priority: 4,
  })

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id)
    setEditFormData({
      title: task.title,
      priority: task.priority,
      dueDate: task.dueDate,
    })
  }

  const cancelEditing = () => {
    setEditingTaskId(null)
  }

  const saveTask = (id: string) => {
    editTask(id, editFormData)
    setEditingTaskId(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: name === 'priority' ? parseInt(value) : value,
    })
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'text-red-500'
      case 2: return 'text-orange-500'
      case 3: return 'text-blue-500'
      default: return 'text-text-secondary'
    }
  }

  const getPriorityTitle = (priority: number) => {
    switch (priority) {
      case 1: return 'Priority 1'
      case 2: return 'Priority 2'
      case 3: return 'Priority 3'
      default: return 'Priority 4'
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] text-text-secondary">
        <p className="text-lg mb-2">No tasks yet</p>
        <p className="text-sm">Click the + button to add a new task</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-2">
      {tasks.map(task => (
        <div
          key={task.id}
          className="flex items-center gap-3 p-3 hover:bg-sidebar rounded-lg group transition-colors"
        >
          <button
            onClick={() => toggleTask(task.id)}
            className={`w-5 h-5 rounded-full border ${task.completed
              ? 'bg-primary border-primary'
              : 'border-text-secondary hover:border-primary'
            } flex items-center justify-center transition-colors`}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed && <Check size={12} className="text-white" />}
          </button>

          <div className="flex-1">
            {editingTaskId === task.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                />
                <div className="flex items-center gap-3">
                  <select
                    name="priority"
                    value={editFormData.priority}
                    onChange={handleInputChange}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value={1}>Priority 1</option>
                    <option value={2}>Priority 2</option>
                    <option value={3}>Priority 3</option>
                    <option value={4}>Priority 4</option>
                  </select>
                </div>
              </div>
            ) : (
              <>
                <p className={`text-sm ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                  {task.title}
                </p>
                {(task.dueDate || task.priority < 4) && (
                  <div className="flex items-center gap-2 mt-1">
                    {task.dueDate && (
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Calendar size={12} />
                        {format(new Date(task.dueDate), 'MMM d')}
                      </span>
                    )}
                    {task.priority < 4 && (
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Flag size={12} className={getPriorityColor(task.priority)} />
                        {getPriorityTitle(task.priority)}
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {editingTaskId === task.id ? (
              <>
                <button
                  onClick={() => saveTask(task.id)}
                  className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-green-500"
                  title="Save changes"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={cancelEditing}
                  className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-red-500"
                  title="Cancel editing"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-red-500"
                  title="Delete task"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => startEditing(task)}
                  className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-primary"
                  title="Edit task"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary"
                  title="More actions"
                >
                  <MoreHorizontal size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
