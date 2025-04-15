'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { TODOIST_COLORS } from '@/lib/constants'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <style jsx global>{`
        :root {
          --primary: ${TODOIST_COLORS.light.primary};
          --background: ${TODOIST_COLORS.light.background};
          --sidebar-background: ${TODOIST_COLORS.light.sidebarBackground};
          --text: ${TODOIST_COLORS.light.text};
          --text-secondary: ${TODOIST_COLORS.light.textSecondary};
          --border: ${TODOIST_COLORS.light.border};
        }
        .dark {
          --primary: ${TODOIST_COLORS.dark.primary};
          --background: ${TODOIST_COLORS.dark.background};
          --sidebar-background: ${TODOIST_COLORS.dark.sidebarBackground};
          --text: ${TODOIST_COLORS.dark.text};
          --text-secondary: ${TODOIST_COLORS.dark.textSecondary};
          --border: ${TODOIST_COLORS.dark.border};
        }
      `}</style>
      <div className="min-h-screen bg-background text-text-primary">
        {children}
      </div>
    </NextThemeProvider>
  )
}
