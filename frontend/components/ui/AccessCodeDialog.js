import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  IconButton
} from '@mui/material'
import { X, Lock, Play } from 'lucide-react'
import { useRouter } from 'next/router'

const AccessCodeDialog = ({ open, onClose }) => {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!accessCode.trim()) {
      setError('Por favor, insira o código de acesso')
      return
    }

    if (accessCode.length < 4) {
      setError('O código deve ter pelo menos 4 caracteres')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simular validação do código (aqui você pode adicionar validação real)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirecionar para a página do jogo com o código
      router.push(`/game?code=${encodeURIComponent(accessCode)}`)

      // Fechar o dialog
      onClose()
      setAccessCode('')
    } catch (err) {
      setError('Erro ao validar código. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setAccessCode('')
    setError('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
          background: 'linear-gradient(135deg, #1A2B33 0%, #131F24 100%)',
          border: '1px solid rgba(86, 255, 158, 0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)'
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            p: 1.5,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #56FF9E 0%, #3EE67A 100%)',
            color: '#131F24'
          }}>
            <Lock size={20} />
          </Box>
          <Typography variant="h6" component="div" sx={{ color: 'white', fontWeight: 600 }}>
            Código de Acesso
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(86, 255, 158, 0.1)',
              color: 'primary.main'
            }
          }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Para acessar o jogo, insira o código fornecido pelo organizador.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            autoFocus
            fullWidth
            label="Código de Acesso"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Digite o código aqui..."
            variant="outlined"
            disabled={loading}
            sx={{ mb: 2 }}
            inputProps={{
              style: {
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textAlign: 'center',
                fontSize: '1.2rem'
              }
            }}
          />

          <Box sx={{
            p: 3,
            background: 'linear-gradient(135deg, rgba(86, 255, 158, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
            borderRadius: 2,
            border: '1px solid rgba(86, 255, 158, 0.2)'
          }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              💡 <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>Dica:</Box> O código é fornecido pelo organizador do evento.
              Certifique-se de digitá-lo exatamente como recebido.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !accessCode.trim()}
            startIcon={loading ? null : <Play size={18} />}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Validando...' : 'Entrar no Jogo'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AccessCodeDialog
