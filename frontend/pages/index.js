import Head from 'next/head'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>CodeRace 2025</title>
        <meta name="description" content="CodeRace 2025 - Competition Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-primary-600">CodeRace 2025</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                The ultimate coding competition platform. Test your skills, compete with others, 
                and push your programming abilities to the limit.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-8 py-3">
                  Start Competing
                </button>
                <button className="btn-secondary text-lg px-8 py-3">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
                <p className="text-gray-600">
                  Lightning-fast code execution and real-time results for immediate feedback.
                </p>
              </div>
              
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Competitive</h3>
                <p className="text-gray-600">
                  Compete with programmers worldwide and climb the leaderboards.
                </p>
              </div>
              
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn & Grow</h3>
                <p className="text-gray-600">
                  Improve your coding skills with challenging problems and detailed solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
