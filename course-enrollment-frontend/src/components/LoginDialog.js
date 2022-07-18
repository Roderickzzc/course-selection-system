import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import login from '../services/jwtService';
import cookie from 'react-cookies';
import { JWT_TOKEN_COOKIE_NAME } from '../constants';
export default function LoginDialog() {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErrorMessage('');
        setOpen(false);
    };
    const handleLogin = () => {
        //send login request to server
        login(username, password)
            .then((response) => {
                cookie.save(JWT_TOKEN_COOKIE_NAME, response.data.access);
                window.location.reload();
            })
            .catch((error) => {
                setErrorMessage(error.response.data.detail)
                // alert(error.response.data.detail);
            });
    };

    console.log(username, password)

    return (
        <div>
            <Button variant="inherit" onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                    <DialogContentText color='red'>
                        {errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogin}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
