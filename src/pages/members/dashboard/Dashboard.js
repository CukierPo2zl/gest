import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { MySheets } from './MySheets';
import { Payments } from './Payments';
import { useState } from 'react';


const AntTablePanel = ({ children, value, index }) => {
    return (
        <TabPanel value={value} index={index}>
            <Grid justify='center' container>
                {children}
            </Grid>
        </TabPanel>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}));
export const Dashboard = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
            >
                <Tab label="My sheets" {...a11yProps(0)} />

                <Tab label="payments" {...a11yProps(2)} />
            </AntTabs>
            <AntTablePanel value={value} index={0}>
                <MySheets />
            </AntTablePanel>
            <AntTablePanel value={value} index={1}><Payments /></AntTablePanel>
        </div>
    );
}
const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
})(Tabs);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component='div'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}




