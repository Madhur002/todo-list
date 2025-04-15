"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Home, ListTodo, Calendar, Plus, Sun, Moon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useProjects } from "@/context/ProjectContext";
import AddProjectModal from "./AddProjectModal";

const sidebarStyles = {
  aside: {
    height: '100vh',
    borderRight: '1px solid #D1D5DB',
    transition: 'all 0.3s',
    backgroundColor: '#F7F7F7',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    padding: '1rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.5rem',
    borderRadius: '0.5rem',
    color: '#374151',
    transition: 'background-color 0.2s',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    color: '#374151',
    transition: 'background-color 0.2s',
  },
  projectsSection: {
    marginTop: '1.5rem',
  },
  projectsHeader: {
    padding: '0 0.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#6B7280',
    marginBottom: '0.5rem',
  },
  addProjectButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    color: '#059669',
    transition: 'background-color 0.2s',
  },
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showAddProject, setShowAddProject] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { projects } = useProjects();

  useEffect(() => {
    setMounted(true);
  }, []);

  const width = isOpen ? '16rem' : '4rem';

  if (!mounted) {
    return (
      <aside style={{ ...sidebarStyles.aside, width }}>
        <div style={sidebarStyles.container}>
          <div style={sidebarStyles.header}>
            <button style={sidebarStyles.button}>
              <div style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <>
      <aside style={{ ...sidebarStyles.aside, width }}>
        <div style={sidebarStyles.container}>
          <div style={sidebarStyles.header}>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={sidebarStyles.button}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={sidebarStyles.button}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <ChevronRight
                size={20}
                style={{
                  transform: isOpen ? 'none' : 'rotate(180deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </button>
          </div>

          <nav style={sidebarStyles.nav}>
            <Link
              href="/"
              style={sidebarStyles.link}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Home size={20} />
              {isOpen && <span>Home</span>}
            </Link>
            <Link
              href="/tasks"
              style={sidebarStyles.link}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <ListTodo size={20} />
              {isOpen && <span>Tasks</span>}
            </Link>
            <Link
              href="/calendar"
              style={sidebarStyles.link}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Calendar size={20} />
              {isOpen && <span>Calendar</span>}
            </Link>
          </nav>

          {isOpen && projects.length > 0 && (
            <div style={sidebarStyles.projectsSection}>
              <h3 style={sidebarStyles.projectsHeader}>Projects</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    style={sidebarStyles.link}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div
                      style={{
                        width: '0.75rem',
                        height: '0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: project.color,
                      }}
                    />
                    <span>{project.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto' }}>
            <button
              onClick={() => setShowAddProject(true)}
              style={sidebarStyles.addProjectButton}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Plus size={20} />
              {isOpen && <span>Add Project</span>}
            </button>
          </div>
        </div>
      </aside>

      <AddProjectModal
        isOpen={showAddProject}
        onClose={() => setShowAddProject(false)}
      />
    </>
  );
}
