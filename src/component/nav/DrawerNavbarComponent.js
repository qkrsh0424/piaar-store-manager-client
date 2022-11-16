import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

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

const UserInfoText = styled.div`
    font-weight: 600;
    font-size: 16px;

    @media only screen and (max-width:576px){
        display: none;
    }
`;

export default function DrawerNavbarComponent(props) {
    const classes = useStyles();
    const userRdx = useSelector(state => state.user);

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ minHeight: '64px' }}>
                <Toolbar style={{backgroundColor:'#7a7bda', minHeight: '64px'}}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.__handleEventControl().drawer().open()}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <CustomLink to='/'>
                            PiAAR Management Sys.
                        </CustomLink>
                    </Typography>
                    {userRdx.isLoading === false &&
                        <UserInfoText>
                            {userRdx?.userInfo.username} 님 <span><SentimentSatisfiedAltIcon /></span>
                        </UserInfoText>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}