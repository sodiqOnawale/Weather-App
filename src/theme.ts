import { createTheme, alpha } from '@mui/material/styles';

// Custom color palette - Midnight Aurora theme
const colors = {
    // Deep navy to vibrant aurora gradient
    midnight: '#0a0e1a',
    deepSpace: '#0f1629',
    twilight: '#1a2744',
    aurora: {
        cyan: '#06b6d4',
        teal: '#14b8a6',
        emerald: '#10b981',
        violet: '#8b5cf6',
        fuchsia: '#d946ef'
    },
    frost: {
        100: '#f0fdfa',
        200: '#ccfbf1',
        300: '#99f6e4',
        400: '#5eead4'
    },
    surface: {
        glass: 'rgba(255, 255, 255, 0.03)',
        glassMedium: 'rgba(255, 255, 255, 0.06)',
        glassStrong: 'rgba(255, 255, 255, 0.1)',
        card: 'rgba(15, 22, 41, 0.8)'
    }
};

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.aurora.cyan,
            light: colors.frost[300],
            dark: '#0891b2',
            contrastText: colors.midnight
        },
        secondary: {
            main: colors.aurora.violet,
            light: '#a78bfa',
            dark: '#7c3aed',
            contrastText: '#ffffff'
        },
        background: {
            default: colors.midnight,
            paper: colors.deepSpace
        },
        text: {
            primary: colors.frost[100],
            secondary: alpha(colors.frost[200], 0.7)
        },
        error: {
            main: '#f43f5e',
            light: '#fb7185'
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24'
        },
        success: {
            main: colors.aurora.emerald,
            light: '#34d399'
        },
        info: {
            main: colors.aurora.cyan,
            light: colors.frost[400]
        },
        divider: alpha(colors.frost[300], 0.08)
    },
    shape: {
        borderRadius: 20
    },
    typography: {
        fontFamily: '"Outfit", "DM Sans", "Poppins", system-ui, sans-serif',
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.02em'
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.02em'
        },
        h3: {
            fontWeight: 600,
            letterSpacing: '-0.01em'
        },
        h4: {
            fontWeight: 600,
            letterSpacing: '-0.01em'
        },
        h5: {
            fontWeight: 600
        },
        h6: {
            fontWeight: 600
        },
        subtitle1: {
            fontWeight: 500,
            letterSpacing: '0.01em'
        },
        body1: {
            letterSpacing: '0.01em'
        },
        body2: {
            letterSpacing: '0.01em'
        },
        button: {
            fontWeight: 600,
            letterSpacing: '0.02em'
        }
    },
    shadows: [
        'none',
        `0 2px 8px ${alpha(colors.midnight, 0.15)}`,
        `0 4px 16px ${alpha(colors.midnight, 0.2)}`,
        `0 6px 20px ${alpha(colors.midnight, 0.25)}`,
        `0 8px 24px ${alpha(colors.midnight, 0.3)}`,
        `0 12px 32px ${alpha(colors.midnight, 0.35)}`,
        `0 16px 40px ${alpha(colors.midnight, 0.4)}`,
        `0 20px 48px ${alpha(colors.midnight, 0.45)}`,
        `0 24px 56px ${alpha(colors.midnight, 0.5)}`,
        `0 28px 64px ${alpha(colors.midnight, 0.55)}`,
        `0 32px 72px ${alpha(colors.midnight, 0.6)}`,
        `0 36px 80px ${alpha(colors.midnight, 0.65)}`,
        `0 40px 88px ${alpha(colors.midnight, 0.7)}`,
        `0 44px 96px ${alpha(colors.midnight, 0.75)}`,
        `0 48px 104px ${alpha(colors.midnight, 0.8)}`,
        `0 52px 112px ${alpha(colors.midnight, 0.82)}`,
        `0 56px 120px ${alpha(colors.midnight, 0.84)}`,
        `0 60px 128px ${alpha(colors.midnight, 0.86)}`,
        `0 64px 136px ${alpha(colors.midnight, 0.88)}`,
        `0 68px 144px ${alpha(colors.midnight, 0.9)}`,
        `0 72px 152px ${alpha(colors.midnight, 0.92)}`,
        `0 76px 160px ${alpha(colors.midnight, 0.94)}`,
        `0 80px 168px ${alpha(colors.midnight, 0.96)}`,
        `0 84px 176px ${alpha(colors.midnight, 0.98)}`,
        `0 88px 184px ${alpha(colors.midnight, 1)}`
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@import': "url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap')",
                '*': {
                    boxSizing: 'border-box'
                },
                html: {
                    scrollBehavior: 'smooth'
                },
                body: {
                    background: `
                        radial-gradient(ellipse 80% 50% at 50% -20%, ${alpha(colors.aurora.violet, 0.15)}, transparent),
                        radial-gradient(ellipse 60% 40% at 80% 0%, ${alpha(colors.aurora.cyan, 0.1)}, transparent),
                        radial-gradient(ellipse 60% 40% at 20% 0%, ${alpha(colors.aurora.fuchsia, 0.08)}, transparent),
                        linear-gradient(180deg, ${colors.midnight} 0%, ${colors.deepSpace} 50%, ${colors.twilight} 100%)
                    `,
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh'
                },
                '::-webkit-scrollbar': {
                    width: '8px'
                },
                '::-webkit-scrollbar-track': {
                    background: colors.deepSpace
                },
                '::-webkit-scrollbar-thumb': {
                    background: alpha(colors.aurora.cyan, 0.3),
                    borderRadius: '4px'
                },
                '::-webkit-scrollbar-thumb:hover': {
                    background: alpha(colors.aurora.cyan, 0.5)
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 12,
                    padding: '10px 24px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                },
                contained: {
                    background: `linear-gradient(135deg, ${colors.aurora.cyan} 0%, ${colors.aurora.teal} 100%)`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.aurora.teal} 0%, ${colors.aurora.cyan} 100%)`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 24px ${alpha(colors.aurora.cyan, 0.35)}`
                    }
                },
                outlined: {
                    borderColor: alpha(colors.aurora.cyan, 0.4),
                    color: colors.aurora.cyan,
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                        borderColor: colors.aurora.cyan,
                        backgroundColor: alpha(colors.aurora.cyan, 0.1)
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: alpha(colors.deepSpace, 0.6),
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(colors.frost[300], 0.08)}`
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: `linear-gradient(135deg, ${alpha(colors.twilight, 0.6)} 0%, ${alpha(colors.deepSpace, 0.8)} 100%)`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(colors.frost[300], 0.1)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 20px 40px ${alpha(colors.midnight, 0.4)}`,
                        border: `1px solid ${alpha(colors.aurora.cyan, 0.2)}`
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: alpha(colors.surface.glassStrong, 0.5),
                        backdropFilter: 'blur(12px)',
                        borderRadius: 14,
                        transition: 'all 0.2s ease',
                        '& fieldset': {
                            borderColor: alpha(colors.frost[300], 0.12)
                        },
                        '&:hover fieldset': {
                            borderColor: alpha(colors.aurora.cyan, 0.4)
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: colors.aurora.cyan,
                            borderWidth: 2
                        }
                    }
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha(colors.surface.glassStrong, 0.5),
                    backdropFilter: 'blur(12px)',
                    borderRadius: 12,
                    border: `1px solid ${alpha(colors.frost[300], 0.1)}`,
                    padding: 4
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: 'none',
                    borderRadius: '8px !important',
                    padding: '6px 16px',
                    color: alpha(colors.frost[200], 0.7),
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                        background: `linear-gradient(135deg, ${colors.aurora.cyan} 0%, ${colors.aurora.teal} 100%)`,
                        color: colors.midnight,
                        fontWeight: 600,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${colors.aurora.teal} 0%, ${colors.aurora.cyan} 100%)`
                        }
                    },
                    '&:hover': {
                        backgroundColor: alpha(colors.aurora.cyan, 0.1)
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontWeight: 500
                },
                filled: {
                    background: `linear-gradient(135deg, ${alpha(colors.aurora.cyan, 0.2)} 0%, ${alpha(colors.aurora.teal, 0.2)} 100%)`,
                    border: `1px solid ${alpha(colors.aurora.cyan, 0.2)}`
                }
            }
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha(colors.frost[300], 0.08)
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    backdropFilter: 'blur(12px)'
                },
                standardError: {
                    backgroundColor: alpha('#f43f5e', 0.15),
                    border: `1px solid ${alpha('#f43f5e', 0.3)}`
                },
                standardWarning: {
                    backgroundColor: alpha('#f59e0b', 0.15),
                    border: `1px solid ${alpha('#f59e0b', 0.3)}`
                },
                standardInfo: {
                    backgroundColor: alpha(colors.aurora.cyan, 0.15),
                    border: `1px solid ${alpha(colors.aurora.cyan, 0.3)}`
                },
                standardSuccess: {
                    backgroundColor: alpha(colors.aurora.emerald, 0.15),
                    border: `1px solid ${alpha(colors.aurora.emerald, 0.3)}`
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: alpha(colors.twilight, 0.95),
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${alpha(colors.frost[300], 0.1)}`,
                    borderRadius: 10,
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    padding: '8px 14px'
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: alpha(colors.aurora.cyan, 0.1),
                        transform: 'scale(1.05)'
                    }
                }
            }
        }
    }
});

export default theme;

// Export colors for use in components
export { colors };
