import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
// import { useAuth } from '../../context/auth';
import { WizardContext } from '../../context/WizardContext';
import { register } from '../../services/services';

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

const PasswordInput = ({ value, onInput, name }) => {
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
            <InputLabel htmlFor="standard-adornment-password">{name}</InputLabel>
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
export const Register = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reppassword, setRepPassword] = useState('');
    const [username, setUsername] = useState('');
    const [, setWizard] = useContext(WizardContext);

    const handleSubmit = async () => {
        register(email, username, password, reppassword);
        setWizard({
            open: false,
        })
    }

    return (
        <Paper className={classes.root}>
            <Typography component='h1' variant='h3'>
                Register
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField value={email} onInput={e => setEmail(e.target.value)} id="standard-basic" label="email" />
                <TextField value={username} onInput={e => setUsername(e.target.value)} id="standard-basic" label="username" />
                <PasswordInput value={password} onInput={e => setPassword(e.target.value)} name={"Password"} />
                <PasswordInput value={reppassword} onInput={e => setRepPassword(e.target.value)} name={"Repeat password"} />
                <Typography component='p' variant='caption'>
                    We don't have password recovery function :(
                </Typography>
                <Button type='submit' variant='contained' color='primary'>Register</Button>
            </form>
        </Paper>
    )
}