import React from 'react'
import { Box } from '@mui/material'

/**
 * Componentes de ícones pixel art customizados para DoctorPixel
 * Criados usando CSS e elementos div para manter o estilo pixel perfeito
 */

// Componente base para ícones pixel
const PixelIcon = ({ children, size = 24, color = 'currentColor', ...props }) => {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        width: size,
        height: size,
        position: 'relative',
        color: color,
        imageRendering: 'pixelated',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

// Pixel individual
const Pixel = ({ x, y, color = 'currentColor', size = 2 }) => (
  <Box
    sx={{
      position: 'absolute',
      left: x * size,
      top: y * size,
      width: size,
      height: size,
      backgroundColor: color,
      imageRendering: 'pixelated'
    }}
  />
)

// Ícone de coração (saúde)
export const HeartIcon = ({ size = 24, color = '#FF6B6B' }) => {
  const pixelSize = size / 12
  return (
    <PixelIcon size={size} color={color}>
      {/* Linha 1 */}
      <Pixel x={2} y={1} color={color} size={pixelSize} />
      <Pixel x={3} y={1} color={color} size={pixelSize} />
      <Pixel x={5} y={1} color={color} size={pixelSize} />
      <Pixel x={6} y={1} color={color} size={pixelSize} />
      
      {/* Linha 2 */}
      <Pixel x={1} y={2} color={color} size={pixelSize} />
      <Pixel x={2} y={2} color={color} size={pixelSize} />
      <Pixel x={3} y={2} color={color} size={pixelSize} />
      <Pixel x={4} y={2} color={color} size={pixelSize} />
      <Pixel x={5} y={2} color={color} size={pixelSize} />
      <Pixel x={6} y={2} color={color} size={pixelSize} />
      <Pixel x={7} y={2} color={color} size={pixelSize} />
      
      {/* Linha 3 */}
      <Pixel x={1} y={3} color={color} size={pixelSize} />
      <Pixel x={2} y={3} color={color} size={pixelSize} />
      <Pixel x={3} y={3} color={color} size={pixelSize} />
      <Pixel x={4} y={3} color={color} size={pixelSize} />
      <Pixel x={5} y={3} color={color} size={pixelSize} />
      <Pixel x={6} y={3} color={color} size={pixelSize} />
      <Pixel x={7} y={3} color={color} size={pixelSize} />
      
      {/* Linha 4 */}
      <Pixel x={2} y={4} color={color} size={pixelSize} />
      <Pixel x={3} y={4} color={color} size={pixelSize} />
      <Pixel x={4} y={4} color={color} size={pixelSize} />
      <Pixel x={5} y={4} color={color} size={pixelSize} />
      <Pixel x={6} y={4} color={color} size={pixelSize} />
      
      {/* Linha 5 */}
      <Pixel x={3} y={5} color={color} size={pixelSize} />
      <Pixel x={4} y={5} color={color} size={pixelSize} />
      <Pixel x={5} y={5} color={color} size={pixelSize} />
      
      {/* Linha 6 */}
      <Pixel x={4} y={6} color={color} size={pixelSize} />
    </PixelIcon>
  )
}

// Ícone de cruz médica
export const MedicalCrossIcon = ({ size = 24, color = '#FF6B6B' }) => {
  const pixelSize = size / 12
  return (
    <PixelIcon size={size} color={color}>
      {/* Barra vertical */}
      <Pixel x={4} y={1} color={color} size={pixelSize} />
      <Pixel x={5} y={1} color={color} size={pixelSize} />
      <Pixel x={4} y={2} color={color} size={pixelSize} />
      <Pixel x={5} y={2} color={color} size={pixelSize} />
      <Pixel x={4} y={3} color={color} size={pixelSize} />
      <Pixel x={5} y={3} color={color} size={pixelSize} />
      <Pixel x={4} y={4} color={color} size={pixelSize} />
      <Pixel x={5} y={4} color={color} size={pixelSize} />
      <Pixel x={4} y={5} color={color} size={pixelSize} />
      <Pixel x={5} y={5} color={color} size={pixelSize} />
      <Pixel x={4} y={6} color={color} size={pixelSize} />
      <Pixel x={5} y={6} color={color} size={pixelSize} />
      <Pixel x={4} y={7} color={color} size={pixelSize} />
      <Pixel x={5} y={7} color={color} size={pixelSize} />
      
      {/* Barra horizontal */}
      <Pixel x={1} y={4} color={color} size={pixelSize} />
      <Pixel x={2} y={4} color={color} size={pixelSize} />
      <Pixel x={3} y={4} color={color} size={pixelSize} />
      <Pixel x={6} y={4} color={color} size={pixelSize} />
      <Pixel x={7} y={4} color={color} size={pixelSize} />
      <Pixel x={8} y={4} color={color} size={pixelSize} />
      <Pixel x={1} y={5} color={color} size={pixelSize} />
      <Pixel x={2} y={5} color={color} size={pixelSize} />
      <Pixel x={3} y={5} color={color} size={pixelSize} />
      <Pixel x={6} y={5} color={color} size={pixelSize} />
      <Pixel x={7} y={5} color={color} size={pixelSize} />
      <Pixel x={8} y={5} color={color} size={pixelSize} />
    </PixelIcon>
  )
}

// Ícone de termômetro
export const ThermometerIcon = ({ size = 24, color = '#00BCD4' }) => {
  const pixelSize = size / 12
  return (
    <PixelIcon size={size} color={color}>
      {/* Bulbo */}
      <Pixel x={4} y={8} color={color} size={pixelSize} />
      <Pixel x={5} y={8} color={color} size={pixelSize} />
      <Pixel x={3} y={9} color={color} size={pixelSize} />
      <Pixel x={4} y={9} color={color} size={pixelSize} />
      <Pixel x={5} y={9} color={color} size={pixelSize} />
      <Pixel x={6} y={9} color={color} size={pixelSize} />
      <Pixel x={4} y={10} color={color} size={pixelSize} />
      <Pixel x={5} y={10} color={color} size={pixelSize} />
      
      {/* Tubo */}
      <Pixel x={4} y={1} color={color} size={pixelSize} />
      <Pixel x={5} y={1} color={color} size={pixelSize} />
      <Pixel x={4} y={2} color={color} size={pixelSize} />
      <Pixel x={5} y={2} color={color} size={pixelSize} />
      <Pixel x={4} y={3} color={color} size={pixelSize} />
      <Pixel x={5} y={3} color={color} size={pixelSize} />
      <Pixel x={4} y={4} color={color} size={pixelSize} />
      <Pixel x={5} y={4} color={color} size={pixelSize} />
      <Pixel x={4} y={5} color={color} size={pixelSize} />
      <Pixel x={5} y={5} color={color} size={pixelSize} />
      <Pixel x={4} y={6} color={color} size={pixelSize} />
      <Pixel x={5} y={6} color={color} size={pixelSize} />
      <Pixel x={4} y={7} color={color} size={pixelSize} />
      <Pixel x={5} y={7} color={color} size={pixelSize} />
    </PixelIcon>
  )
}

// Ícone de pílula
export const PillIcon = ({ size = 24, color = '#4CAF50' }) => {
  const pixelSize = size / 12
  return (
    <PixelIcon size={size} color={color}>
      {/* Metade esquerda */}
      <Pixel x={2} y={3} color={color} size={pixelSize} />
      <Pixel x={3} y={3} color={color} size={pixelSize} />
      <Pixel x={1} y={4} color={color} size={pixelSize} />
      <Pixel x={2} y={4} color={color} size={pixelSize} />
      <Pixel x={3} y={4} color={color} size={pixelSize} />
      <Pixel x={4} y={4} color={color} size={pixelSize} />
      <Pixel x={1} y={5} color={color} size={pixelSize} />
      <Pixel x={2} y={5} color={color} size={pixelSize} />
      <Pixel x={3} y={5} color={color} size={pixelSize} />
      <Pixel x={4} y={5} color={color} size={pixelSize} />
      <Pixel x={2} y={6} color={color} size={pixelSize} />
      <Pixel x={3} y={6} color={color} size={pixelSize} />
      
      {/* Metade direita (cor diferente) */}
      <Pixel x={6} y={3} color="#FF9800" size={pixelSize} />
      <Pixel x={7} y={3} color="#FF9800" size={pixelSize} />
      <Pixel x={5} y={4} color="#FF9800" size={pixelSize} />
      <Pixel x={6} y={4} color="#FF9800" size={pixelSize} />
      <Pixel x={7} y={4} color="#FF9800" size={pixelSize} />
      <Pixel x={8} y={4} color="#FF9800" size={pixelSize} />
      <Pixel x={5} y={5} color="#FF9800" size={pixelSize} />
      <Pixel x={6} y={5} color="#FF9800" size={pixelSize} />
      <Pixel x={7} y={5} color="#FF9800" size={pixelSize} />
      <Pixel x={8} y={5} color="#FF9800" size={pixelSize} />
      <Pixel x={6} y={6} color="#FF9800" size={pixelSize} />
      <Pixel x={7} y={6} color="#FF9800" size={pixelSize} />
    </PixelIcon>
  )
}

// Ícone de estetoscópio
export const StethoscopeIcon = ({ size = 24, color = '#2196F3' }) => {
  const pixelSize = size / 12
  return (
    <PixelIcon size={size} color={color}>
      {/* Auriculares */}
      <Pixel x={1} y={1} color={color} size={pixelSize} />
      <Pixel x={2} y={1} color={color} size={pixelSize} />
      <Pixel x={7} y={1} color={color} size={pixelSize} />
      <Pixel x={8} y={1} color={color} size={pixelSize} />
      
      {/* Tubos */}
      <Pixel x={2} y={2} color={color} size={pixelSize} />
      <Pixel x={7} y={2} color={color} size={pixelSize} />
      <Pixel x={3} y={3} color={color} size={pixelSize} />
      <Pixel x={6} y={3} color={color} size={pixelSize} />
      <Pixel x={4} y={4} color={color} size={pixelSize} />
      <Pixel x={5} y={4} color={color} size={pixelSize} />
      
      {/* Peça do peito */}
      <Pixel x={3} y={7} color={color} size={pixelSize} />
      <Pixel x={4} y={7} color={color} size={pixelSize} />
      <Pixel x={5} y={7} color={color} size={pixelSize} />
      <Pixel x={6} y={7} color={color} size={pixelSize} />
      <Pixel x={3} y={8} color={color} size={pixelSize} />
      <Pixel x={4} y={8} color={color} size={pixelSize} />
      <Pixel x={5} y={8} color={color} size={pixelSize} />
      <Pixel x={6} y={8} color={color} size={pixelSize} />
      <Pixel x={4} y={9} color={color} size={pixelSize} />
      <Pixel x={5} y={9} color={color} size={pixelSize} />
      
      {/* Conexão */}
      <Pixel x={4} y={5} color={color} size={pixelSize} />
      <Pixel x={5} y={5} color={color} size={pixelSize} />
      <Pixel x={4} y={6} color={color} size={pixelSize} />
      <Pixel x={5} y={6} color={color} size={pixelSize} />
    </PixelIcon>
  )
}

// Ícone de ambulância
export const AmbulanceIcon = ({ size = 24, color = '#FF6B6B' }) => {
  const pixelSize = size / 16
  return (
    <PixelIcon size={size} color={color}>
      {/* Carroceria */}
      <Pixel x={2} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={3} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={4} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={5} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={6} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={7} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={8} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={9} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={10} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={11} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={12} y={4} color="#FFFFFF" size={pixelSize} />
      <Pixel x={13} y={4} color="#FFFFFF" size={pixelSize} />
      
      {/* Cruz vermelha */}
      <Pixel x={6} y={2} color={color} size={pixelSize} />
      <Pixel x={7} y={2} color={color} size={pixelSize} />
      <Pixel x={4} y={3} color={color} size={pixelSize} />
      <Pixel x={5} y={3} color={color} size={pixelSize} />
      <Pixel x={6} y={3} color={color} size={pixelSize} />
      <Pixel x={7} y={3} color={color} size={pixelSize} />
      <Pixel x={8} y={3} color={color} size={pixelSize} />
      <Pixel x={9} y={3} color={color} size={pixelSize} />
      <Pixel x={6} y={4} color={color} size={pixelSize} />
      <Pixel x={7} y={4} color={color} size={pixelSize} />
      
      {/* Rodas */}
      <Pixel x={4} y={8} color="#333333" size={pixelSize} />
      <Pixel x={5} y={8} color="#333333" size={pixelSize} />
      <Pixel x={10} y={8} color="#333333" size={pixelSize} />
      <Pixel x={11} y={8} color="#333333" size={pixelSize} />
    </PixelIcon>
  )
}

// Exporta todos os ícones
export const PixelIcons = {
  Heart: HeartIcon,
  MedicalCross: MedicalCrossIcon,
  Thermometer: ThermometerIcon,
  Pill: PillIcon,
  Stethoscope: StethoscopeIcon,
  Ambulance: AmbulanceIcon
}

export default PixelIcons
