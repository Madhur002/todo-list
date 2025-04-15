'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Plus, Bell, X } from 'lucide-react'
import { useTasks } from '@/context/TaskContext'
import AddTaskModal from './AddTaskModal'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const { searchTasks } = useTasks()
  const searchResults = searchTasks(searchQuery)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchFocus = () => {
    setShowResults(true)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setShowResults(false)
  }

  return (
    <>
      <nav className="h-14 border-b border-border bg-background px-4">
        <div className="flex items-center justify-between h-full">
          {/* Left section */}
          <div className="flex-1"></div>
          
          {/* Center section with search bar */}
          <div className="flex-1 flex justify-center">
            <div ref={searchRef} className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                size={18}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full pl-10 pr-10 py-1.5 rounded-lg bg-sidebar border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-text-primary placeholder-text-secondary"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              )}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        clearSearch()
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-sidebar transition-colors text-text-primary"
                    >
                      {result.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right section with buttons */}
          <div className="flex-1 flex items-center justify-end gap-2">
            <button
              onClick={() => setShowAddTask(true)}
              className="p-2 hover:bg-sidebar rounded-lg transition-colors text-primary"
              title="Add task"
            >
              <Plus size={20} />
            </button>
            <button
              className="p-2 hover:bg-sidebar rounded-lg transition-colors text-text-primary"
              title="Notifications"
            >
              <Bell size={20} />
            </button>
          </div>
        </div>
      </nav>

      <AddTaskModal
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
      />
    </>
  )
}
