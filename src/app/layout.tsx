import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import { ProjectProvider } from '@/context/ProjectContext'
import { TaskProvider } from '@/context/TaskContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todoist Clone',
  description: 'A beautiful Todoist clone built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <ProjectProvider>
            <TaskProvider>{children}</TaskProvider>
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
