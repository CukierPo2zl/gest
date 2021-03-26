import { Button, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { WizardContext } from '../../context/WizardContext';
import { Login } from './Login';
import { Register } from './Register';
import { SpreadSheet } from '../members/sheet/Spreadsheet';
import { SupportedToolsContext, SupportedToolsProvider } from '../../context/ToolsContext';
import { generateEmptySheetData } from '../../utlis';
import GitHubIcon from '@material-ui/icons/GitHub';
import { getSupportedTools } from '../../services/services';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 15%',
    },
    hero: {
        backgroundColor: theme.palette.primary.main,
        height: '350px',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        margin: "0 0 25px 0",
    },
    footer: {
        backgroundColor: theme.palette.primary.main,
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
    },
    spacer: {
        margin: "3rem 0",
    },
    topbar: {
        position: "fixed",
        top: 0,
        color: '#ffffff',
        backgroundColor: theme.palette.primary.main,
        zIndex: 1,
    },
    btns: {
        position: "fixed",
        top: 10,
        color: '#ffffff',
        zIndex: 1,
    },
    gitBtn: {
        "&:hover": {
            color: "#37ad46",
            transition: "1s",
        }
    }
}));


const Hero = ({ loginCallback, regCallback }) => {
    const classes = useStyles();
    return (
        <>
            <Grid alignItems='center' justify='space-between' className={clsx(classes.topbar, classes.container, 'engineer')} container>
                <div className='logo'>
                    <h2>GEST</h2>
                </div>
            </Grid>

            <Grid direction="row" justify="flex-end" alignItems="center" className={clsx(classes.btns, classes.container)} container >
                <Button style={{ margin: '5px' }} variant='outlined' color='inherit' onClick={loginCallback}>
                    Login
                </Button>
                <Button variant='outlined' color='inherit' onClick={regCallback}>
                    Register
                </Button>
            </Grid>
            <div className={clsx(classes.hero, 'engineer', classes.container)}>
                <Grid direction='column' spacing={3} container>
                    <Grid item>
                        <Typography component='h1' variant='h2'>
                            Fast and simple
                        </Typography>
                        <Typography component='p' variant='subtitle1'>
                            Online environment for econometric analysis
                        </Typography>
                    </Grid>
                    <Grid spacing={2} container item>
                        <Grid item>
                            <Button variant='contained' color='secondary' onClick={loginCallback}>
                                Start now
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant='text' color='secondary' onClick={loginCallback}>
                                Learn more
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const Demo = ({regCallback}) => {
    const [demoData, setDemoData] = useState({
        data: [
            [
                {
                    "value": "",
                    "readOnly": true
                },
                {
                    "value": "y",
                    "readOnly": true
                },
                {
                    "value": "x",
                    "readOnly": true
                },
                {
                    "value": "C",
                    "readOnly": true
                },
                {
                    "value": "D",
                    "readOnly": true
                },
                {
                    "value": "E",
                    "readOnly": true
                },
                {
                    "value": "F",
                    "readOnly": true
                },
                {
                    "value": "G",
                    "readOnly": true
                },
                {
                    "value": "H",
                    "readOnly": true
                },
                {
                    "value": "I",
                    "readOnly": true
                }
            ],
            [
                {
                    "value": 1,
                    "readOnly": true
                },
                {
                    "value": "23"
                },
                {
                    "value": "234"
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                }
            ],
            [
                {
                    "value": 2,
                    "readOnly": true
                },
                {
                    "value": "42"
                },
                {
                    "value": "23"
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                }
            ],
            [
                {
                    "value": 3,
                    "readOnly": true
                },
                {
                    "value": "34"
                },
                {
                    "value": "423"
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                }
            ],
            [
                {
                    "value": 4,
                    "readOnly": true
                },
                {
                    "value": "23"
                },
                {
                    "value": "234"
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                }
            ],
            [
                {
                    "value": 5,
                    "readOnly": true
                },
                {
                    "value": "42"
                },
                {
                    "value": "23"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 6,
                    "readOnly": true
                },
                {
                    "value": "34"
                },
                {
                    "value": "423"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 7,
                    "readOnly": true
                },
                {
                    "value": "23"
                },
                {
                    "value": "234"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 8,
                    "readOnly": true
                },
                {
                    "value": "42"
                },
                {
                    "value": "23"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 9,
                    "readOnly": true
                },
                {
                    "value": "34"
                },
                {
                    "value": "423"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 10,
                    "readOnly": true
                },
                {
                    "value": "23"
                },
                {
                    "value": "4"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ]
        ], tools: [
            "KMNK",
            "DurbinWatson",
            "GoldfeldQuandt",
            "HarrisonMcCabe",
            "JarqueBer"
        ], outputs: [
            {
                "output_data": {
                    "a0": 361.68301886792455,
                    "a1": -4.915094339622642
                },
                "tool_handle": "KMNK"
            },
            {
                "output_data": {
                    "expl": "Wystepuje autokorelacja dodatnia",
                    "DW_coefficient": 2.8709512356876643
                },
                "tool_handle": "DurbinWatson"
            },
            {
                "output_data": {
                    "F": 4.9503,
                    "GQ": 2.076889588300213,
                    "expl": "Wystepuje homoskedastycznosc"
                },
                "tool_handle": "GoldfeldQuandt"
            },
            {
                "output_data": {
                    "b": 0.32500353727428904,
                    "bL": 0.11073583965450418,
                    "bU": 0.30124111338715504,
                    "expl": "Wystepuje homoskedastycznosc"
                },
                "tool_handle": "HarrisonMcCabe"
            },
            {
                "output_data": {
                    "X": 5.991465,
                    "JB": 0.8281040655366467,
                    "expl": "Skladnik losowy ma rozklad normalny"
                },
                "tool_handle": "JarqueBer"
            }
        ]
    });

    const handleDeleteSpreadsheet = (pk) => {
    }

    const handleOnChange = (data, tools, outputs, pk) => {
        regCallback()
        // setDemoData({ data: data, tools: tools, outputs: outputs })
    }
    return (
        <div className="demo-sheet">
            <SpreadSheet
                pk={0}
                data={demoData.data}
                tools={demoData.tools}
                outputs={demoData.outputs}
                onDeleteSpreadsheet={handleDeleteSpreadsheet}
                onChange={handleOnChange}
            />
        </div>
    );
}

const LandingContent = ({regCallback}) => {
    const classes = useStyles();
    const [, setTools] = useContext(SupportedToolsContext);
    useEffect(() => {
        setTools([{ "name": "KMNK", "input": ["x", "y"] }, { "name": "GoldfeldQuandt", "input": ["x", "y"] }, { "name": "DurbinWatson", "input": ["x", "y"] }, { "name": "JarqueBer", "input": ["x", "y"] }, { "name": "HarrisonMcCabe", "input": ["x", "y"] }]);
    }, [])

    return (
        <>
            <Grid justify="space-between" container className={classes.container}>
                <Grid alignItems="center" direction="column" container>
                    <Typography component='h1' variant='h4'>
                        Try now
                </Typography>
                    <Typography component='p' variant='subtitle1'>
                        Make complex calculations without effort.
                </Typography>
                </Grid>
                <Grid className={classes.spacer} item>
                    <Demo regCallback={regCallback}/>
                </Grid>
            </Grid>
            <Community />
            <GithubBlock />

        </>
    );
}
const GithubBlock = () => {
    const classes = useStyles();
    return (
        <>
            <div className={clsx(classes.container, classes.spacer)}>
                <Grid alignItems="center" direction="column" container>
                    <Typography component='h1' variant='h4'>
                        Check us out on Github
                    </Typography>
                    <Typography component='p' variant='subtitle1'>
                        You can check our open source library that provides GEST calculations .
                    </Typography>
                    <Grid>
                        <IconButton className={classes.gitBtn}><GitHubIcon /></IconButton>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <div className={clsx(classes.footer, 'engineer', classes.container)}>
                <Grid direction='column' container>

                </Grid>
            </div>
        </>
    )
}

const Community = () => {
    const classes = useStyles();
    return (
        <>
            <div className={clsx(classes.footer, 'engineer', classes.container, classes.spacer)}>
                <Grid direction='column' container>
                    <Typography component='h1' variant='h2'>
                        Join our community
                    </Typography>
                    <Typography component='p' variant='subtitle1'>
                        Feel free to ask questions and share your knowledge.
                    </Typography>
                    <Grid>
                        <Button variant='contained' color='secondary'>
                            Join us
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export const Landing = () => {
    const [, setWizard] = useContext(WizardContext);
    const handleLogin = () => {
        setWizard({
            open: true,
            content: <Login />,
            fullScreen: true,
        })
    }
    const handleRegister = () => {
        setWizard({
            open: true,
            content: <Register />,
            fullScreen: true,
        })
    }

    return (
        <>
            <Hero loginCallback={handleLogin} regCallback={handleRegister} />
            <SupportedToolsProvider>
                <LandingContent regCallback={handleRegister} />
            </SupportedToolsProvider>

        </>
    )

}

export const Public = () => {
    return (
        <>
            <Route path='/' component={Landing} />
            <Redirect to='/' />
        </>
    )
}