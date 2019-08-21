import React from 'react';

// material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import Avatar from '@material-ui/core/Avatar';
import Button from  "@material-ui/core/Button";
import Link from  "@material-ui/core/Link";

// material UI icon
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Assignment';
import CircularProgress from '@material-ui/core/CircularProgress';

// css style
import useStyles from '../css';

// army picture
import army from '../../img/army.png';


import useInfiniteScroll from "./useInfiniteScroll";



function DataTable(props){
        
    const classes = useStyles();
    const dataList = props.data.dataList ? props.data.dataList : [];
    const {rowSet, curPage, search,sortDB} = props.tableSet
    //const count = this.props.data.count ? parseInt(this.props.data.count) : 0;
    const totalPage = props.data.totalPage ? parseInt(props.data.totalPage) : 0;

  

    const handleDelete = (e) => {
    
      
        const {rowSet,search,sortDB, totalPage} = props.tableSet;
        props.delete({id : e.currentTarget.value}, rowSet, 1 , search, totalPage , sortDB );
     
    }
    
    const handleEdit = (action, data) => {

         props.history.push({
             pathname: '/form/'+ action,
             state: data
           })
     }

     const handleShort = (sort) =>{

        const {rowSet,totalPage,search,sortDB} = props.tableSet;
        let newSort ={};
       
     

        if( !sortDB[sort] ){
            //ASC
            newSort[sort] = 1;
        }else{
            
     
            if(sortDB[sort]  === 1){
                //DESC
                newSort[sort] = -1;
            }
            if(sortDB[sort] === -1){
                //NA
                newSort[sort] = 1;
            } 
        }


        props.getList(rowSet, 1, search,totalPage,newSort);
       
    
    }

    const sortMark = (sortName) => {

         const {sortDB} = props.tableSet;

        if(sortDB[sortName]){
            if(sortDB[sortName] === 1){
                return 'desc';
            }
            if(sortDB[sortName] === -1){
                return 'asc';
            }
        }

    }

    const fetchMoreListItems = () =>{
       
            if(curPage !== totalPage){

                let morePage;

                if(curPage +1 <= totalPage){
                    morePage = curPage +1;
                }else{
                    morePage = curPage;
                } 


                props.getMoreList(rowSet, morePage, search, totalPage, sortDB);
               
            }

            setIsFetching(false);
        
 
    }

    const HandleGetSuperior =(superiorID, superiorType) =>{

        props.getSuperior(superiorID, superiorType);

    }

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    
    return(
    
        <div>


            <Table>
                <TableHead>
                <TableRow>
                    <TableCell align="center">
                        Avatar
                    </TableCell>
                    <TableCell>
                        <TableSortLabel active={sortDB.firstName ? true : false} direction={sortMark('firstName')} onClick={()=>(handleShort('firstName'))} >
                            Name
                        </TableSortLabel>
                    </TableCell>
                        
                    <TableCell>
                        <TableSortLabel active={sortDB.sex ? true : false} direction={sortMark('sex')} onClick={()=>(handleShort('sex'))} > 
                        Sex&nbsp;
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel active={sortDB.rank ? true : false} direction={sortMark('rank')} onClick={()=>(handleShort('rank'))} > 
                        Rank&nbsp;
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel active={sortDB.startDate ? true : false} direction={sortMark('startDate')} onClick={()=>(handleShort('startDate'))} > 
                        Start Date&nbsp;
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel active={sortDB.phone ? true : false} direction={sortMark('phone')} onClick={()=>(handleShort('phone'))} > 
                        Phone&nbsp;
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel active={sortDB.email ? true : false} direction={sortMark('email')} onClick={()=>(handleShort('email'))} > 
                        Email&nbsp;
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel active={sortDB.superopr ? true : false} direction={sortMark('superopr')} onClick={()=>(handleShort('superopr'))} > 
                        Superior&nbsp;
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel active={sortDB.DS ? true : false} direction={sortMark('DS')} onClick={()=>(handleShort('DS'))} > 
                        # of D.S&nbsp;
                        </TableSortLabel>

                    </TableCell>
                    <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {dataList.map(row => (
                    
                    <TableRow hover tabIndex={-1} key={row._id}>
                        <TableCell align="center" size='small'> <Avatar aria-label="army" src={row.image ? row.image : army} className={classes.bigAvatar} size='small'/></TableCell>
                        <TableCell  component="th" scope="row">
                            {row.firstName + " " + row.lastName}
                        </TableCell>
                        <TableCell align="left" size='small'>{row.sex}</TableCell>
                        <TableCell align="left" size='small'>{row.rank}</TableCell>
                        <TableCell align="left" size='small'>{row.startDate.split('T')[0] }</TableCell>
                        <TableCell align="left" size='small'>   
                            <Link href= {`facetime://${row.phone}`} className={classes.link}>
                                    {row.phone}
                            </Link>
                        </TableCell>
                        <TableCell align="left" size='small'>
                            <Link href= {`mailto:${row.email}`} className={classes.link}>
                                {row.email}
                            </Link>
                        </TableCell>
                        <TableCell align="left" size='small'>{row.superior &&  
                        
                                <Button color="primary" className={classes.button} onClick={() => HandleGetSuperior(row.superiorID)}> {row.superior} </Button>}</TableCell>

                        <TableCell align="left" size='small'>
                            {row.DS > 0 ? 
                                // eslint-disable-next-line no-script-url
                                <Link href='javascript:;' onClick={() => HandleGetSuperior(row._id, true)} className={classes.link}>{row.DS}</Link> : row.DS}
                               {/*  <Button color="primary" className={classes.button} onClick={() => HandleGetSuperior(row._id, true)}> {row.DS} </Button> : row.DS}  */}
                        
                        </TableCell>
                        <TableCell align="center" size='small'>
                      
                                <Tooltip title="Edit User" aria-label="editUser">
                                    <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    aria-label="Edit"
                                    onClick={() => handleEdit('Edit',row)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete User" aria-label="deleteUser">
                                    <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    aria-label="Delete"
                                    onClick={handleDelete}
                                    value={row._id}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                        </TableCell>
               
                    </TableRow>
                    
                ))} 
                {isFetching &&
                    <TableRow>
                        <TableCell colSpan={10} align="center">
                            <CircularProgress  size={20}  />  Fetching more list items...
                        </TableCell>    
                    </TableRow>
                }

                </TableBody>
            </Table>
        </div>


    )


}

export default DataTable;