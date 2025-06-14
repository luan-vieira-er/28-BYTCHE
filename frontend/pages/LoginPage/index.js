import { Button, InputAdornment, TextField, Divider, Box, Typography } from "@mui/material";
import { useRouter } from 'next/router';

export default function LoginPage() {
    const router = useRouter();

    const handleEndAdornmentClick = () => {
        // Substitua '/sua-rota' pela rota que você deseja navegar
        router.push('/sua-rota');
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
                padding: { xs: 2, sm: 3, md: 4 }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 3, sm: 4 },
                    alignItems: 'center',
                    width: { xs: '100%', sm: '400px', md: '450px' },
                    maxWidth: '95vw'
                }}
            >
                {/* Título */}
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                        fontWeight: 'normal',
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: '"Press Start 2P", monospace',
                        marginBottom: { xs: 2, sm: 3 }
                    }}
                >
                    Entrar
                </Typography>

                {/* Campo Email */}
                <TextField
                    placeholder="E-mail ou nome de usuário"
                    variant="outlined"
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#2a3940',
                            borderRadius: '12px',
                            fontSize: { xs: '12px', sm: '14px' },
                            fontFamily: '"Press Start 2P", monospace',
                            color: '#8fa3ad',
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
                            padding: { xs: '14px 16px', sm: '16px 18px' },
                            color: '#8fa3ad',
                            fontFamily: '"Press Start 2P", monospace',
                            fontSize: { xs: '10px', sm: '12px' },
                            '&::placeholder': {
                                color: '#8fa3ad',
                                opacity: 1,
                                fontFamily: '"Press Start 2P", monospace'
                            }
                        }
                    }}
                />

                {/* Campo Senha */}
                <TextField
                    placeholder="Senha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#2a3940',
                            borderRadius: '12px',
                            fontSize: { xs: '12px', sm: '14px' },
                            fontFamily: '"Press Start 2P", monospace',
                            color: '#8fa3ad',
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
                            padding: { xs: '14px 16px', sm: '16px 18px' },
                            color: '#8fa3ad',
                            fontFamily: '"Press Start 2P", monospace',
                            fontSize: { xs: '10px', sm: '12px' },
                            '&::placeholder': {
                                color: '#8fa3ad',
                                opacity: 1,
                                fontFamily: '"Press Start 2P", monospace'
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
                                            color: '#6b7c87',
                                            fontFamily: '"Press Start 2P", monospace',
                                            fontSize: { xs: '8px', sm: '10px' },
                                            transition: 'color 0.3s ease',
                                            textTransform: 'uppercase'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#8fa3ad'}
                                        onMouseLeave={(e) => e.target.style.color = '#6b7c87'}
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
                        backgroundColor: '#56FF9E',
                        color: '#1a2332',
                        borderRadius: '12px',
                        padding: { xs: '12px 0', sm: '14px 0', md: '16px 0' },
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        fontWeight: 'normal',
                        fontFamily: '"Press Start 2P", monospace',
                        textTransform: 'uppercase',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#4ade80',
                            boxShadow: 'none'
                        }
                    }}
                >
                    ENTRAR
                </Button>

                {/* Separador OU */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        my: { xs: 2, sm: 3 }
                    }}
                >
                    <Divider
                        sx={{
                            flex: 1,
                            borderColor: '#3a4a57',
                            borderWidth: '1px'
                        }}
                    />
                    <Typography
                        sx={{
                            mx: 3,
                            color: '#6b7c87',
                            fontSize: { xs: '10px', sm: '12px' },
                            fontFamily: '"Press Start 2P", monospace',
                            textTransform: 'uppercase'
                        }}
                    >
                        OU
                    </Typography>
                    <Divider
                        sx={{
                            flex: 1,
                            borderColor: '#3a4a57',
                            borderWidth: '1px'
                        }}
                    />
                </Box>

                {/* Botões de redes sociais */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: { xs: 2, sm: 3 },
                        width: '100%',
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}
                >
                    <Button variant="text" className="flex w-full">
                        Criar uma conta
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}