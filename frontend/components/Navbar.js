import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            CodeRace 2025
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/problems" className="text-gray-700 hover:text-primary-600 transition-colors">
              Problems
            </Link>
            <Link href="/leaderboard" className="text-gray-700 hover:text-primary-600 transition-colors">
              Leaderboard
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </Link>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="btn-secondary">
              Sign In
            </button>
            <button className="btn-primary">
              Sign Up
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/problems" className="text-gray-700 hover:text-primary-600 transition-colors">
                Problems
              </Link>
              <Link href="/leaderboard" className="text-gray-700 hover:text-primary-600 transition-colors">
                Leaderboard
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <button className="btn-secondary">
                  Sign In
                </button>
                <button className="btn-primary">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
