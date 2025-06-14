import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Layout from '@/components/Layout'

// Importação dinâmica do jogo para evitar problemas de SSR com Pixi.js
const MedicalTriageGame = dynamic(() => import('@/components/game/MedicalTriageGame'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Carregando o Hospital Virtual...</p>
      </div>
    </div>
  )
})

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)

  if (gameStarted) {
    return (
      <>
        <Head>
          <title>Hospital Virtual - Triagem Médica Infantil</title>
          <meta name="description" content="Plataforma gamificada de triagem médica para crianças" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MedicalTriageGame onExit={() => setGameStarted(false)} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Hospital Virtual - Triagem Médica Infantil</title>
        <meta name="description" content="Plataforma gamificada de triagem médica para crianças" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>

              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Bem-vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">Hospital Virtual</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Uma aventura divertida onde você conhece o Dr. Pixel e seus amigos!
                Explore o hospital, faça novos amigos e aprenda sobre saúde de forma super divertida! 🏥✨
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => setGameStarted(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🎮 Começar Aventura
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium text-lg px-8 py-4 rounded-full shadow-lg border-2 border-gray-200 transition-all duration-200">
                  📖 Como Jogar
                </button>
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Dr. Pixel - IA Amigável</h3>
                <p className="text-gray-600">
                  Conheça o Dr. Pixel! Ele é super inteligente e vai te ajudar em cada passo da sua visita ao hospital.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎮</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Jogos Divertidos</h3>
                <p className="text-gray-600">
                  Minijogos educativos, quebra-cabeças e atividades que tornam a triagem médica uma aventura!
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Sistema de Recompensas</h3>
                <p className="text-gray-600">
                  Ganhe estrelas, desbloqueie conquistas e colecione itens especiais durante sua jornada!
                </p>
              </div>
            </div>

            <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Como Funciona? 🤔</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Entre no Hospital</h4>
                  <p className="text-sm text-gray-600">Crie seu avatar e explore o ambiente virtual</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-green-600">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Conheça o Dr. Pixel</h4>
                  <p className="text-sm text-gray-600">Nosso NPC com IA vai te receber e explicar tudo</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Faça a Triagem</h4>
                  <p className="text-sm text-gray-600">Responda perguntas através de jogos divertidos</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-yellow-600">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Receba Cuidados</h4>
                  <p className="text-sm text-gray-600">Obtenha orientações personalizadas e recompensas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
