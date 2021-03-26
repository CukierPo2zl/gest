import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';


const useStyles = makeStyles((theme) => ({
    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),

    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: 0,
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(1),
        },
    },
}));


export const FabMenu = ({ onAddSpreadSheet, onSave, onExport }) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.exampleWrapper}>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction='left'
            >
                <SpeedDialAction
                    key='Blank spreadsheet'
                    icon={<FileCopyIcon />}
                    tooltipTitle='Blank spreadsheet'
                    onClick={onAddSpreadSheet}
                />
                <SpeedDialAction
                    key='Save'
                    icon={<SaveIcon />}
                    tooltipTitle='Save'
                    onClick={onSave}
                />
                <SpeedDialAction
                    key='export'
                    icon={<PictureAsPdfIcon />}
                    tooltipTitle='export'
                    onClick={onExport}
                />
            </SpeedDial>
        </div>
    );
}