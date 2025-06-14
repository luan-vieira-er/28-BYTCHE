import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { MedicalCrossIcon } from '@/components/ui/PixelIcons'

// Importação dinâmica do jogo para evitar problemas de SSR com Pixi.js
const MedicalTriageGame = dynamic(() => import('@/components/game/MedicalTriageGame'), {
  ssr: false,
  loading: () => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #E3F2FD 0%, #F1F8E9 100%)'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box className="animate-pixel-pulse" sx={{ mb: 4 }}>
          <MedicalCrossIcon size={64} color="#00BCD4" />
        </Box>
        <Box 
          sx={{ 
            fontFamily: '"Press Start 2P", monospace', 
            fontSize: '1rem',
            color: 'primary.main'
          }}
        >
          Carregando DoctorPixel...
        </Box>
      </Box>
    </Box>
  )
})

export default function Game() {
  return (
    <>
      <Head>
        <title>Jogar - DoctorPixel</title>
        <meta name="description" content="Jogue DoctorPixel - Hospital Virtual em Pixel Art" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MedicalTriageGame />
    </>
  )
}
