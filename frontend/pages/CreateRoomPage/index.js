import Head from 'next/head';
import { Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import apiService from '../../services/api.service';

export default function CreateRoomPage() {
    const router = useRouter();

    // Auth store
    const { isAuthenticated, getCurrentUser, initAuth } = useAuthStore();

    const [formData, setFormData] = useState({
        tipo_consulta: '',
        perfil_paciente: '',
        restricoes: '',
        foco: '',
        historico_previo: '',
        nome_paciente: '',
        idade: '',
        status: '',
    });

    // Verificar autenticação ao carregar a página
    useEffect(() => {
        initAuth();

        if (!isAuthenticated) {
            alert('Você precisa estar logado para criar uma consulta');
            router.push('/LoginPage');
        }
    }, [isAuthenticated, initAuth, router]);

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSubmit = async () => {
        console.log('Dados do formulário:', formData);

        // Validação básica
        if (!formData.tipo_consulta || !formData.perfil_paciente || !formData.foco || !formData.nome_paciente || !formData.idade) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            // Obter dados do usuário logado do store
            const currentUser = getCurrentUser();
            if (!currentUser) {
                alert('Você precisa estar logado para criar uma consulta');
                router.push('/LoginPage');
                return;
            }

            // Preparar dados para envio
            const roomData = {
                doctorId: currentUser.id,
                finalidade: formData.tipo_consulta,
                restricoes: formData.restricoes,
                perfil_paciente: formData.perfil_paciente,
                foco: formData.foco,
                historico_previo: formData.historico_previo || '',
                nome_paciente: formData.nome_paciente,
                idade: parseInt(formData.idade),
                status: formData.status || 'AGUARDANDO'
            };

            // Chamada para a API de criação de sala
            const response = await apiService.createRoom(roomData);

            if (response.success) {
                alert('Consulta criada com sucesso!');
                // Redirecionar para a página principal ou lista de salas
                router.push('/');
            } else {
                alert(response.message || 'Erro ao criar consulta');
            }
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            alert('Erro ao criar consulta. Tente novamente.');
        }
    };

    return (
        <>
            <Head>
                <title>Criar Sala - DoctorPixel</title>
                <meta name="description" content="Crie uma nova sala de consulta na plataforma DoctorPixel" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #131F24 0%, #0A1015 100%)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
        }}>
            {/* Background Effects */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                    radial-gradient(circle at 20% 80%, rgba(86, 255, 158, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(86, 255, 158, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(78, 205, 196, 0.05) 0%, transparent 50%)
                `,
                zIndex: 0
            }} />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: { xs: '95%', sm: '420px', md: '480px' },
                    maxWidth: '95vw',
                    maxHeight: '90vh',
                    p: { xs: 2, sm: 2.5, md: 3 },
                    borderRadius: 3,
                    background: 'rgba(26, 43, 51, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(86, 255, 158, 0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}
            >
                {/* Título */}
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 1.5,
                        background: 'linear-gradient(135deg, #56FF9E 0%, #4ECDC4 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 40px rgba(86, 255, 158, 0.3)'
                    }}
                >
                    Criar Nova Consulta
                </Typography>

                {/* Select Tipo de Consulta */}
                <FormControl
                    fullWidth
                    sx={{ mb: 1 }}
                >
                    <InputLabel
                        sx={{
                            color: '#B0BEC5',
                            fontSize: '0.85rem',
                            '&.Mui-focused': { color: '#56FF9E' }
                        }}
                    >
                        Tipo de Consulta
                    </InputLabel>
                    <Select
                        value={formData.tipo_consulta}
                        onChange={handleInputChange('tipo_consulta')}
                        label="Tipo de Consulta"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(86, 255, 158, 0.3)',
                                borderWidth: '1px'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(86, 255, 158, 0.5)'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#56FF9E'
                            },
                            '& .MuiSelect-select': {
                                color: '#FFFFFF',
                                backgroundColor: 'rgba(26, 43, 51, 0.8)',
                                fontSize: '0.85rem'
                            }
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: 'rgba(26, 43, 51, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(86, 255, 158, 0.3)',
                                    borderRadius: 2,
                                    '& .MuiMenuItem-root': {
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            backgroundColor: 'rgba(86, 255, 158, 0.1)'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(86, 255, 158, 0.2)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(86, 255, 158, 0.3)'
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
                    label="Perfil do Paciente"
                    placeholder="Descreva o perfil do paciente..."
                    multiline
                    rows={1}
                    variant="outlined"
                    fullWidth
                    value={formData.perfil_paciente}
                    onChange={handleInputChange('perfil_paciente')}
                    sx={{
                        mb: 1,
                        '& .MuiInputLabel-root': {
                            color: '#B0BEC5',
                            fontSize: '0.85rem',
                            '&.Mui-focused': { color: '#56FF9E' }
                        },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(26, 43, 51, 0.8)',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(86, 255, 158, 0.3)',
                                borderWidth: '1px'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(86, 255, 158, 0.5)'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#56FF9E'
                            }
                        },
                        '& .MuiOutlinedInput-input': {
                            color: '#FFFFFF',
                            fontSize: '0.85rem',
                            '&::placeholder': {
                                color: '#B0BEC5',
                                opacity: 0.7
                            }
                        }
                    }}
                />

                {/* Grid com Nome do Paciente e Idade */}
                <Grid container spacing={1.5} sx={{ mb: 1, width: '100%', flexWrap: 'nowrap' }}>
                    <Grid item xs={12} sm={6} sx={{ width: '50%' }}>
                        <TextField
                            label="Nome do Paciente"
                            placeholder="Digite o nome do paciente"
                            variant="outlined"
                            fullWidth
                            value={formData.nome_paciente}
                            onChange={handleInputChange('nome_paciente')}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#B0BEC5',
                                    fontSize: '0.85rem',
                                    '&.Mui-focused': { color: '#56FF9E' }
                                },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(26, 43, 51, 0.8)',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(86, 255, 158, 0.3)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(86, 255, 158, 0.5)'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#56FF9E'
                                    }
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#FFFFFF',
                                    fontSize: '0.85rem',
                                    '&::placeholder': {
                                        color: '#B0BEC5',
                                        opacity: 0.7
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ width: '50%' }}>
                        <TextField
                            label="Idade"
                            placeholder="Idade do paciente"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={formData.idade}
                            onChange={handleInputChange('idade')}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#B0BEC5',
                                    fontSize: '0.85rem',
                                    '&.Mui-focused': { color: '#56FF9E' }
                                },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(26, 43, 51, 0.8)',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(86, 255, 158, 0.3)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(86, 255, 158, 0.5)'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#56FF9E'
                                    }
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#FFFFFF',
                                    fontSize: '0.85rem',
                                    '&::placeholder': {
                                        color: '#B0BEC5',
                                        opacity: 0.7
                                    }
                                }
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Campo Status */}
                <FormControl
                    fullWidth
                    sx={{ mb: 1 }}
                >
                    <InputLabel
                        sx={{
                            color: '#B0BEC5',
                            fontSize: '0.85rem',
                            '&.Mui-focused': { color: '#56FF9E' }
                        }}
                    >
                        Status do Paciente
                    </InputLabel>
                    <Select
                        value={formData.status}
                        onChange={handleInputChange('status')}
                        label="Status do Paciente"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(86, 255, 158, 0.3)',
                                borderWidth: '1px'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(86, 255, 158, 0.5)'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#56FF9E'
                            },
                            '& .MuiSelect-select': {
                                color: '#FFFFFF',
                                backgroundColor: 'rgba(26, 43, 51, 0.8)',
                                fontSize: '0.85rem'
                            }
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: 'rgba(26, 43, 51, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(86, 255, 158, 0.3)',
                                    borderRadius: 2,
                                    '& .MuiMenuItem-root': {
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            backgroundColor: 'rgba(86, 255, 158, 0.1)'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(86, 255, 158, 0.2)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(86, 255, 158, 0.3)'
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem value="estavel">Estável</MenuItem>
                        <MenuItem value="critico">Crítico</MenuItem>
                        <MenuItem value="observacao">Em Observação</MenuItem>
                        <MenuItem value="alta">Alta Médica</MenuItem>
                        <MenuItem value="internado">Internado</MenuItem>
                    </Select>
                </FormControl>

                {/* Grid com Foco e Restrições */}
                <Grid container spacing={1.5} sx={{ mb: 1, width: '100%', flexWrap: 'nowrap'  }}>
                    <Grid item xs={12} sm={6} sx={{ width: '50%' }}>
                        <TextField
                            label="Foco da Consulta"

                            multiline
                            rows={1}
                            variant="outlined"
                            fullWidth
                            value={formData.foco}
                            onChange={handleInputChange('foco')}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#B0BEC5',
                                    fontSize: '0.85rem',
                                    '&.Mui-focused': { color: '#56FF9E' }
                                },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(26, 43, 51, 0.8)',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(86, 255, 158, 0.3)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(86, 255, 158, 0.5)'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#56FF9E'
                                    }
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#FFFFFF',
                                    fontSize: '0.85rem',
                                    '&::placeholder': {
                                        color: '#B0BEC5',
                                        opacity: 0.7
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ width: '50%' }}>
                        <TextField
                            label="Restrições"

                            multiline
                            rows={1}
                            variant="outlined"
                            fullWidth
                            value={formData.restricoes}
                            onChange={handleInputChange('restricoes')}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#B0BEC5',
                                    fontSize: '0.85rem',
                                    '&.Mui-focused': { color: '#56FF9E' }
                                },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(26, 43, 51, 0.8)',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(86, 255, 158, 0.3)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(86, 255, 158, 0.5)'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#56FF9E'
                                    }
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#FFFFFF',
                                    fontSize: '0.85rem',
                                    '&::placeholder': {
                                        color: '#B0BEC5',
                                        opacity: 0.7
                                    }
                                }
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Campo Histórico Prévio */}
                <TextField
                    label="Histórico Médico Prévio"
                    placeholder="Descreva o histórico médico relevante..."
                    multiline
                    rows={1.5}
                    variant="outlined"
                    fullWidth
                    value={formData.historico_previo}
                    onChange={handleInputChange('historico_previo')}
                    sx={{
                        mb: 1.5,
                        '& .MuiInputLabel-root': {
                            color: '#B0BEC5',
                            fontSize: '0.85rem',
                            '&.Mui-focused': { color: '#56FF9E' }
                        },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(26, 43, 51, 0.8)',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(86, 255, 158, 0.3)',
                                borderWidth: '1px'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(86, 255, 158, 0.5)'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#56FF9E'
                            }
                        },
                        '& .MuiOutlinedInput-input': {
                            color: '#FFFFFF',
                            fontSize: '0.85rem',
                            '&::placeholder': {
                                color: '#B0BEC5',
                                opacity: 0.7
                            }
                        }
                    }}
                />

                {/* Botões */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1.5,
                        width: '100%',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center'
                    }}
                >
                    {/* Botão Criar Consulta */}
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            flex: { xs: 'none', sm: 1 },
                            maxWidth: { sm: '140px' },
                            py: 0.7,
                            px: 2,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #56FF9E 0%, #3EE67A 100%)',
                            color: '#131F24',
                            boxShadow: '0 4px 15px rgba(86, 255, 158, 0.4)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #3EE67A 0%, #2DD865 100%)',
                                boxShadow: '0 8px 25px rgba(86, 255, 158, 0.5)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Criar Consulta
                    </Button>

                    {/* Botão Voltar */}
                    <Button
                        variant="outlined"
                        onClick={() => router.back()}
                        sx={{
                            flex: { xs: 'none', sm: 1 },
                            maxWidth: { sm: '160px' },
                            py: 0.8,
                            px: 2.5,
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            borderRadius: 3,
                            border: '2px solid #56FF9E',
                            color: '#56FF9E',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                backgroundColor: 'rgba(86, 255, 158, 0.1)',
                                border: '2px solid #3EE67A',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Voltar
                    </Button>
                </Box>
            </Box>
        </Box>
        </>
    );
}
