import { Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateRoomPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        tipo_consulta: '',
        perfil_paciente: '',
        foco: '',
        historico_previo: ''
    });

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSubmit = () => {
        console.log('Dados do formulário:', formData);
        // Aqui você pode adicionar a lógica para enviar os dados
    };

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(135deg, #1a2332 0%, #131f24 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Press Start 2P", monospace',
                padding: { xs: 1, sm: 2, md: 3 },
                overflow: 'auto'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 2, sm: 2.5, md: 3 },
                    alignItems: 'center',
                    width: { xs: '95%', sm: '400px', md: '450px' },
                    maxWidth: '95vw',
                    margin: 'auto',
                    py: { xs: 2, sm: 3 }
                }}
            >
                {/* Título */}
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                        fontWeight: 'normal',
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: '"Press Start 2P", monospace',
                        marginBottom: { xs: 1, sm: 2 },
                        lineHeight: 1.3
                    }}
                >
                    Criar Nova Consulta
                </Typography>

                {/* Select Tipo de Consulta */}
                <FormControl
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#2a3940',
                            borderRadius: '8px',
                            fontSize: { xs: '7px', sm: '8px' },
                            fontFamily: '"Press Start 2P", monospace',
                            color: 'white',
                            border: 'none',
                            minHeight: '40px',
                            '& fieldset': {
                                border: 'none'
                            },
                            '&:hover fieldset': {
                                border: 'none'
                            },
                            '&.Mui-focused fieldset': {
                                border: 'none'
                            },
                            '&:hover': {
                                backgroundColor: '#334149'
                            },
                            '&.Mui-focused': {
                                backgroundColor: '#334149'
                            }
                        },
                    }}
                >
                    <InputLabel id="demo-simple-select-autowidth-label">Tipo de Consulta</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        value={formData.tipo_consulta}
                        onChange={handleInputChange('tipo_consulta')}
                        label="Tipo de Consulta"
                        sx={
                            {
                                padding: { xs: '4px', sm: '4px' },
                            }
                        }
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: '#2a3940',
                                    border: '1px solid #3a4a57',
                                    borderRadius: '8px',
                                    '& .MuiMenuItem-root': {
                                        fontFamily: '"Press Start 2P", monospace',
                                        fontSize: { xs: '8px', sm: '9px' },
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#334149'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: '#56FF9E',
                                            color: '#1a2332',
                                            '&:hover': {
                                                backgroundColor: '#4ade80'
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem value="primeira_consulta">
                            Primeira consulta
                        </MenuItem>
                        <MenuItem value="acompanhamento_terapeutico">
                            Acompanhamento terapêutico
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Campo Perfil do Paciente */}
                <TextField
                    placeholder="Perfil do paciente"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    value={formData.perfil_paciente}
                    onChange={handleInputChange('perfil_paciente')}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#2a3940',
                            borderRadius: '8px',
                            fontSize: { xs: '10px', sm: '11px' },
                            fontFamily: '"Press Start 2P", monospace',
                            color: 'white',
                            border: 'none',
                            '& fieldset': {
                                border: 'none'
                            },
                            '&:hover fieldset': {
                                border: 'none'
                            },
                            '&.Mui-focused fieldset': {
                                border: 'none'
                            },
                            '&:hover': {
                                backgroundColor: '#334149'
                            },
                            '&.Mui-focused': {
                                backgroundColor: '#334149'
                            }
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: { xs: '8px 12px', sm: '10px 14px' },
                            color: 'white',
                            fontFamily: '"Press Start 2P", monospace',
                            fontSize: { xs: '8px', sm: '9px' },
                            '&::placeholder': {
                                color: '#8fa3ad',
                                opacity: 1,
                                fontFamily: '"Press Start 2P", monospace'
                            }
                        }
                    }}
                />

                {/* Campo Foco */}
                <TextField
                    placeholder="Foco da consulta"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    value={formData.foco}
                    onChange={handleInputChange('foco')}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#2a3940',
                            borderRadius: '8px',
                            fontSize: { xs: '10px', sm: '11px' },
                            fontFamily: '"Press Start 2P", monospace',
                            color: 'white',
                            border: 'none',
                            '& fieldset': {
                                border: 'none'
                            },
                            '&:hover fieldset': {
                                border: 'none'
                            },
                            '&.Mui-focused fieldset': {
                                border: 'none'
                            },
                            '&:hover': {
                                backgroundColor: '#334149'
                            },
                            '&.Mui-focused': {
                                backgroundColor: '#334149'
                            }
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: { xs: '8px 12px', sm: '10px 14px' },
                            color: 'white',
                            fontFamily: '"Press Start 2P", monospace',
                            fontSize: { xs: '8px', sm: '9px' },
                            '&::placeholder': {
                                color: '#8fa3ad',
                                opacity: 1,
                                fontFamily: '"Press Start 2P", monospace'
                            }
                        }
                    }}
                />

                {/* Campo Histórico Prévio */}
                <TextField
                    placeholder="Histórico prévio"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    value={formData.historico_previo}
                    onChange={handleInputChange('historico_previo')}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#2a3940',
                            borderRadius: '8px',
                            fontSize: { xs: '10px', sm: '11px' },
                            fontFamily: '"Press Start 2P", monospace',
                            color: 'white',
                            border: 'none',
                            '& fieldset': {
                                border: 'none'
                            },
                            '&:hover fieldset': {
                                border: 'none'
                            },
                            '&.Mui-focused fieldset': {
                                border: 'none'
                            },
                            '&:hover': {
                                backgroundColor: '#334149'
                            },
                            '&.Mui-focused': {
                                backgroundColor: '#334149'
                            }
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: { xs: '8px 12px', sm: '10px 14px' },
                            color: 'white',
                            fontFamily: '"Press Start 2P", monospace',
                            fontSize: { xs: '8px', sm: '9px' },
                            '&::placeholder': {
                                color: '#8fa3ad',
                                opacity: 1,
                                fontFamily: '"Press Start 2P", monospace'
                            }
                        }
                    }}
                />

                {/* Botões em linha para desktop */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: { xs: 1.5, sm: 2 },
                        width: '100%',
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}
                >
                    {/* Botão Criar Consulta */}
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            flex: { xs: 'none', sm: 1 },
                            backgroundColor: '#56FF9E',
                            color: '#1a2332',
                            borderRadius: '8px',
                            padding: { xs: '8px 16px', sm: '10px 20px' },
                            fontSize: { xs: '8px', sm: '9px' },
                            fontWeight: 'normal',
                            fontFamily: '"Press Start 2P", monospace',
                            textTransform: 'uppercase',
                            boxShadow: 'none',
                            minHeight: { xs: '32px', sm: '36px' },
                            '&:hover': {
                                backgroundColor: '#4ade80',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        CRIAR CONSULTA
                    </Button>

                    {/* Botão Voltar */}
                    <Button
                        variant="outlined"
                        onClick={() => router.back()}
                        sx={{
                            flex: { xs: 'none', sm: 1 },
                            backgroundColor: 'transparent',
                            border: '1px solid #3a4a57',
                            borderRadius: '8px',
                            padding: { xs: '8px 16px', sm: '10px 20px' },
                            color: '#8fa3ad',
                            fontSize: { xs: '8px', sm: '9px' },
                            fontFamily: '"Press Start 2P", monospace',
                            textTransform: 'uppercase',
                            minHeight: { xs: '32px', sm: '36px' },
                            '&:hover': {
                                backgroundColor: 'rgba(143, 163, 173, 0.1)',
                                border: '1px solid #8fa3ad'
                            }
                        }}
                    >
                        VOLTAR
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}