import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import TaskList from '@/components/TaskList'

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <TaskList />
        </main>
      </div>
    </div>
  )
}
