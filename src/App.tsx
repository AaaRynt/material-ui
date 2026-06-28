// src/App.tsx
import { Footer, Header, Main } from '@/layout'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#3c3c3c] text-gray-200">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
