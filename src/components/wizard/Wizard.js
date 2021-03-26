import React, { useContext } from 'react';
import { Drawer, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { WizardContext } from '../../context/WizardContext';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(10)
  },
  fullWidth: { width: '100vw' },
  closeBtn: {
    top: 0,
    left: 0,
    padding: '2rem 0 0 2rem',
  },
  paper: {
    background: '#f7f7f7',
  }
}));

export const Wizard = () => {

  const [wizard, setWizard] = useContext(WizardContext);

  const classes = useStyles();
  return (
    <Drawer
      classes={{ paper: classes.paper }}
      anchor='right' open={wizard.open}
      onClose={(event) => setWizard({ open: false })}
      BackdropProps={{ invisible: true }}
    >
      <div className={wizard.fullScreen ? classes.fullWidth : null}>
        {
          wizard.fullScreen
            ?
            <div className={classes.closeBtn} >
              <IconButton onClick={() => setWizard({open: false})} aria-label="delete" className={classes.margin}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </div>
            :
            null
        }
        <div className={classes.content}>
          {wizard.content}
        </div>
      </div>
    </Drawer>
  )
}