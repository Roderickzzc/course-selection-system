import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LoginDialog from './LoginDialog';
import cookie from 'react-cookies';
import { JWT_TOKEN_COOKIE_NAME } from '../constants';

export default function MenuBar() {
    const token = cookie.load(JWT_TOKEN_COOKIE_NAME);
    const handleLogout = () => {
        cookie.remove(JWT_TOKEN_COOKIE_NAME);
        window.location.reload();
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Course Registration Service
                    </Typography>
                    <Button color="inherit" component={Link} to="/">All Courses</Button>
                    {
                        token && <Button color="inherit" component={Link} to="/enroll">Enrolled Courses</Button>
                    }
                    {/* <Button color="inherit">Login</Button> */}
                    {/* <Button color="inherit" component={Link} to="/login">Login</Button> */}
                    {
                        token ? <Button color='inherit' onClick={handleLogout}>Logout</Button> : <LoginDialog />
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
}