import Head from 'next/head';
import { Button, InputAdornment, TextField, Divider, Box, Typography } from "@mui/material";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
    const router = useRouter();

    // Auth store
    const { login, register } = useAuthStore();

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Função para atualizar os campos do formulário
    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    // Função para lidar com o login
    const handleLogin = async () => {
        console.log('Dados do login:', formData);

        // Validação básica
        if (!formData.email || !formData.password) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        try {
            // Usar o store de autenticação
            const result = await login({
                name: formData.email, // O backend espera 'name'
                password: formData.password
            });

            if (result.success) {
                alert('Login realizado com sucesso!');
                // Redirecionar para a página principal
                router.push('/');
            } else {
                alert(result.message || 'Erro no login');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    // Função para lidar com a criação de conta
    const handleCreateAccount = async () => {
        console.log('Criar conta clicado');

        // Validação básica
        if (!formData.email || !formData.password) {
            alert('Por favor, preencha todos os campos para criar uma conta');
            return;
        }

        try {
            // Usar o store de autenticação
            const result = await register({
                name: formData.email,
                password: formData.password
            });

            if (result.success) {
                alert('Conta criada com sucesso! Agora você pode fazer login.');
                // Limpar o formulário
                setFormData({ email: '', password: '' });
            } else {
                alert(result.message || 'Erro ao criar conta');
            }
        } catch (error) {
            console.error('Erro ao criar conta:', error);
            alert('Erro ao criar conta. Tente novamente.');
        }
    };

    const handleEndAdornmentClick = () => {
        console.log('Esqueceu a senha clicado');
        // Aqui você pode redirecionar para recuperação de senha
        alert('Redirecionando para recuperação de senha...');
    };

    const handleGoBack = () => {
        router.push('/');
    };


    return (
        <>
            <Head>
                <title>Login - DoctorPixel</title>
                <meta name="description" content="Faça login na plataforma DoctorPixel" />
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
                {/* Botão Voltar */}
                <Box sx={{ mb: 2, textAlign: 'left' }}>
                    <Button
                        variant="text"
                        startIcon={<ArrowLeft size={16} />}
                        onClick={handleGoBack}
                        sx={{
                            fontSize: '0.8rem',
                            color: 'text.secondary',
                            '&:hover': {
                                color: 'primary.main',
                                backgroundColor: 'rgba(86, 255, 158, 0.1)'
                            }
                        }}
                    >
                        Voltar
                    </Button>
                </Box>

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
                    value={formData.email}
                    onChange={handleInputChange('email')}
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
                    value={formData.password}
                    onChange={handleInputChange('password')}
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
                    onClick={handleLogin}
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
                        onClick={handleCreateAccount}
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
        </>
    );
}
