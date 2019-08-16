import React from 'react';


// material UI
import { fade,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DeleteIcon from '@material-ui/icons/Delete';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ClearIcon from '@material-ui/icons/Clear';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';


import flag from './img/flag2.png';
import army from './img/army.png'

// react route
import {  
    BrowserRouter,
    Route,
    Switch} from 'react-router-dom';

    
//Redux 
import { bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';

//redux store
import store from './redux/store'

//redux action
import * as searchAction from './redux/action'

//redux State
const mapStateToProps = (state) => {
    console.log(state);
    return {
      ...state
    }
  }
  
//redux Dispatch
const mapDispatchToProps = (dispatch) => {
    return{
          ...bindActionCreators(searchAction,dispatch)
    }
}

//redux Components
//const UserTableRedux = connect(mapStateToProps, mapDispatchToProps)(UserTable);
//const FormRedux = connect(mapStateToProps, mapDispatchToProps)(Form);



const useStyles = makeStyles(theme => ({

  
      table: {
      
      },
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    progress: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(3, 2),
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        overflowX: 'auto',
    },
    card: {
    
    },
    bigAvatar: {
        margin: 5,
        width: 60,
        height: 60,
      },
    grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
        marginLeft: theme.spacing(2),
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
       
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      fab: {

        margin: 5,
      }


  
  }));


  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }





function App() {
    const classes = useStyles();
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
    const rows2 = [];
      
    return( 
     <div>



        <Paper className={classes.paper}>
   
    
            <AppBar position="static">
        <Toolbar>
          <Avatar aria-label="army" src={army} className={classes.bigAvatar}/>
          <Typography className={classes.title} variant="h6" noWrap>
            USA Army Registration System
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
         
            </div>

            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Tooltip title="Add User" aria-label="add">
            <Fab color="secondary" className={classes.fab}>
                <AddIcon />
            </Fab>
          
          </Tooltip>

          <Tooltip title="Clean search result" aria-label="add">
            <Fab color="error" className={classes.fab}>
                    <ClearIcon />
            </Fab>
          
          </Tooltip>
      
        
          </div>
        </Toolbar>
        </AppBar>
{/* 
            <CardHeader
        avatar={
          <Avatar aria-label="army" src={army} />
        }
        title="Army"
        subheader="September 14, 2016"
      />
 */}

      

        <div className={classes.tableWrapper}>


        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              align='left'
              padding='default'
              sortDirection = 'true'>
                   <TableSortLabel
              active='true'
              direction='asc' >Dessert (100g serving)</TableSortLabel>
                  
                  </TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Delete&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow hover tabIndex={-1} key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell  align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell   align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <Button  variant="contained" color="secondary" className={classes.button}>
                    Delete
                    <DeleteIcon className={classes.rightIcon} />
             </Button>
            </TableRow>
          ))}
                  {rows2.map(row => (
            <TableRow hover tabIndex={-1} key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell  align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell   align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </div>
        


          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
          <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
        <Button variant="contained" color="primary" className={classes.button}>
                Send
                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                <CloudUploadIcon className={classes.rightIcon} />
        </Button>
        <Button variant="contained" color="default" className={classes.button}>
        Upload
        <CloudUploadIcon className={classes.rightIcon} />
      </Button> Loading
      <CircularProgress className={classes.progress} />


 
   

      
      </Paper>
      </div>


    )

}

export default App; 
