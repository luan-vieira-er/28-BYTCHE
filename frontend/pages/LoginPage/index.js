import { Button, InputAdornment, TextField, Divider, Box, Typography } from "@mui/material";
import { useRouter } from 'next/router';

export default function LoginPage() {
    const router = useRouter();

    const handleEndAdornmentClick = () => {
        // Substitua '/sua-rota' pela rota que você deseja navegar
        router.push('/sua-rota');
    };

    return (
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
                    width: { xs: '90%', sm: '400px', md: '450px' },
                    maxWidth: '95vw',
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: 4,
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
                        fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 2.5,
                        background: 'linear-gradient(135deg, #56FF9E 0%, #4ECDC4 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 40px rgba(86, 255, 158, 0.3)'
                    }}
                >
                    Entrar
                </Typography>

                {/* Campo Email */}
                <TextField
                    label="E-mail ou usuário"
                    placeholder="Digite seu e-mail ou nome de usuário"
                    variant="outlined"
                    fullWidth
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

                {/* Campo Senha */}
                <TextField
                    label="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{
                        mb: 2,
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
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <span
                                        onClick={handleEndAdornmentClick}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#B0BEC5',
                                            fontSize: '0.75rem',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#56FF9E'}
                                        onMouseLeave={(e) => e.target.style.color = '#B0BEC5'}
                                    >
                                        Esqueceu?
                                    </span>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {/* Botão Entrar */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        py: 1.2,
                        px: 4,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #56FF9E 0%, #3EE67A 100%)',
                        color: '#131F24',
                        boxShadow: '0 4px 15px rgba(86, 255, 158, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        mb: 2,
                        '&:hover': {
                            background: 'linear-gradient(135deg, #3EE67A 0%, #2DD865 100%)',
                            boxShadow: '0 8px 25px rgba(86, 255, 158, 0.5)',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    Entrar
                </Button>

                {/* Separador OU */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        my: 2
                    }}
                >
                    <Divider
                        sx={{
                            flex: 1,
                            borderColor: 'rgba(86, 255, 158, 0.3)',
                            borderWidth: '1px'
                        }}
                    />
                    <Typography
                        sx={{
                            mx: 3,
                            color: '#B0BEC5',
                            fontSize: '0.85rem',
                            fontWeight: 500
                        }}
                    >
                        OU
                    </Typography>
                    <Divider
                        sx={{
                            flex: 1,
                            borderColor: 'rgba(86, 255, 158, 0.3)',
                            borderWidth: '1px'
                        }}
                    />
                </Box>

                {/* Botão Criar Conta */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            py: 1,
                            px: 3,
                            fontSize: '0.9rem',
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
                        Criar uma conta
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}