import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const CustomLink = styled(Link)`
    color:white;
    &:hover{
        text-decoration: none;
        color:#e1e1e1;
    }
`;

export default function DrawerNavbarComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar style={{backgroundColor:'#7a7bda'}}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.__handleEventControl().drawer().open()}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <CustomLink to='/'>
                            PiAAR Management Sys.
                        </CustomLink>

                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}