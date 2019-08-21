import React from 'react';
import { useState } from 'react';
// material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


// material UI icon
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';


// army picture
import army from '../../img/army.png';

// css style
import useStyles from '../css';



const inputStyle = makeStyles(theme => ({

  inputRoot: {
    color: "#FFFFFF"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },


}))





function TableTools(props) {

  const classes = useStyles();
  const inputClass = inputStyle();


  const [searchText, setSearchText] = useState('');

  const handleCreate =  (props, action) => {

     props.history.push('/form/'+ action);;
  
  }

  const handleSearch =  (e) =>{
      const {rowSet,curPage,totalPage,sortDB} = props.tableSet;
      setSearchText(e.target.value);
      props.getList(rowSet,curPage,e.target.value,totalPage,sortDB);
 
     
  }

  const handleClean = (e) =>{
    setSearchText('');
    props.getList(5,1,'',1,{modifyDate : -1});
    
}



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>


          

          <Avatar aria-label="army" src={army} className={classes.bigAvatar}/>

          <Typography className={classes.title} variant="h6" noWrap>
          &nbsp; USA Army Registration System
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: inputClass.inputRoot,
                input: inputClass.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={handleSearch}
            />
          </div>

         
     

          <Tooltip title="Clean search result" aria-label="clearSearch">
            <IconButton
        
              className={classes.menuButton}
              color="inherit"
              aria-label="clear"
              onClick = {handleClean}
            >
                <ClearIcon />
            </IconButton>
                  
          
          </Tooltip>
          <Tooltip title="Create new user" aria-label="addUser">
            <Fab color="secondary" aria-label="edit" className={classes.menuButton} onClick={() => {handleCreate(props,'Create')} } >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TableTools;