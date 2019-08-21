import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green } from '@material-ui/core/colors';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


// icon setting
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  

// css setting
const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    progress: {
      marginTop: 0,
      marginBottom: 0,
    },
  }));
  

//Snackbar Rendering
function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message} &nbsp;&nbsp;
            {variant==='warning' && <CircularProgress  size={20} className={classes.progress} />}
          </span>
        }

        {...other}
      /> 
    );
  }


  
const Msg = (props) =>{

    const {type, value, text} = props;


    switch(type){

        case 'LOADING':

            return(value && 
                        <MySnackbarContentWrapper
                        variant="warning"
                        message= {text}
                        />

                );

        case 'ERROR':   

            return(value && 
                        <MySnackbarContentWrapper
                            variant="error"
                            message= {text + " " + value.message} 
                        />
                );

        default:

            return('');


    }

}

export default Msg;