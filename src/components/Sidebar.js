import React, { useState, useContext } from 'react';
import { CssBaseline, ListItem, ListItemText, Drawer, List, Divider, Button, ListItemIcon, IconButton, Menu, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from "react-router-dom";
import { WizardContext } from '../context/WizardContext';
import { NewSheetContent } from './wizard/NewSheetContent';
// import { useAuth } from '../context/auth';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import { AuthenticationContext } from '../context/bloc/authBloc/authBlocContext';
import { Logout } from '../context/bloc/authBloc/authBloc';
import { CachedSheetsContext } from '../context/CachedSheetsContext';

export const mainListItems = (
    <Link className="default-link" to="/dashboard">
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
    </Link>
);

export const SecondaryListItems = () => {
    return (
        <div>
            <Link className="default-link" to="/dashboard">
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="My sheets" />
                </ListItem>
            </Link>
            <Link className="default-link" to="/dashboard">
                <ListItem button>
                    <ListItemIcon>
                        <ForumRoundedIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Forum" />
                </ListItem>
            </Link>
            <Link className="default-link" to="/dashboard">
                <ListItem button>
                    <ListItemIcon>
                        <HelpOutlineRoundedIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="FAQ" />
                </ListItem>
            </Link>

        </div >
    )
}
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        fontFamily: 'Montserrat',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(6),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    bottomPush: {
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        paddingBottom: 10,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },

}));

const SettingsMenu = ({ anchorEl, anchorElCallback }) => {
    // const { logout } = useAuth();
    const authBloc = useContext(AuthenticationContext);

    const handleClose = () => {
        anchorElCallback(null);
    };
    const handleLogout = async () => {
        authBloc.current.add(new Logout())
        // await logout();
    }
    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    )
}

export default function Sidebar() {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(true);
    const handleDrawer = () => setIsOpen(!isOpen);
    const [, setWizard] = useContext(WizardContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [, , , setNeedResetSignal] = useContext(CachedSheetsContext); // Proxy


    const handleNewSheet = () => {
        setWizard({
            open: true,
            content: <NewSheetContent updateSheetListSignal={setNeedResetSignal} />,
            fullScreen: true,
        })
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };



    return (
        <>
            <CssBaseline />
            <Drawer
                PaperProps={{ elevation: 2 }}
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose, 'engineer'),
                }}
                open={isOpen}>
                <div className={classes.wrapper}>
                    <div className='content'>
                        <div className={classes.toolbarIcon} style={{ justifyContent: isOpen ? 'space-between' : 'center' }}>
                            {isOpen && <h2>GEST</h2>}
                            <IconButton onClick={handleDrawer}>
                                {isOpen ? <ChevronLeftIcon style={{ color: 'white' }} /> : <ChevronRightIcon style={{ color: 'white' }} />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <List>{mainListItems}</List>
                            {
                                isOpen ?
                                    <ListItem>
                                        <Button
                                            style={{
                                                'width': '100%'
                                            }}
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<AddCircleIcon />}
                                            onClick={() => handleNewSheet()}
                                        >New</Button>
                                    </ListItem>
                                    :
                                    <ListItem button onClick={() => handleNewSheet()}>
                                        <ListItemIcon>
                                            <AddCircleIcon color='secondary' />
                                        </ListItemIcon>
                                    </ListItem>
                            }
                            <SecondaryListItems />
                        </List>
                    </div>
                    <div>
                        <Divider />
                        <ListItem aria-haspopup="true" onClick={handleClick} button>
                            <ListItemIcon>
                                <SettingsIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <SettingsMenu anchorEl={anchorEl} anchorElCallback={(value) => setAnchorEl(value)} />
                    </div>
                </div>
            </Drawer>
        </>
    )
}