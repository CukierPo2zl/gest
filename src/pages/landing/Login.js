import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
// import { useAuth } from '../../context/auth';
import { WizardContext } from '../../context/WizardContext';
import { AuthenticationContext } from '../../context/bloc/authBloc/authBlocContext';
import { Login as LoginEvent } from '../../context/bloc/authBloc/authBloc';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(5),
        },
    },
    form: {
        display: 'grid',
    },
    margin: {
        margin: theme.spacing(1, 0, 2, 0),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        // width: '20ch',
    },
}));

const PasswordInput = ({ value, onInput }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const classes = useStyles();
    return (
        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                value={value}
                onInput={onInput}
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}
export const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { login } = useAuth();
    const [, setWizard] = useContext(WizardContext);
    const authBloc = useContext(AuthenticationContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        authBloc.current.add(new LoginEvent(email, password))
        // await login(email, password);
        setWizard({
            open: false,
        })
    }

    return (
        <Paper className={classes.root}>
            <Typography component='h1' variant='h3'>
                Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField value={email} onInput={e => setEmail(e.target.value)} id="standard-basic" label="email/username" />
                <PasswordInput value={password} onInput={e => setPassword(e.target.value)} />
                <Typography component='p' variant='caption'>
                    We don't have password recovery function :(
                </Typography>
                <Button type='submit' variant='contained' color='primary'>Login</Button>
            </form>
        </Paper>
    )
}