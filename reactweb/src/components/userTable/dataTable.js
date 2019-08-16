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

// material UI icon
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Assignment';

// css style
import useStyles from '../css';

// army picture
import army from '../../img/army.png';


function DataTable(props){
        
        const classes = useStyles();
        const dataList = props.data.dataList ? props.data.dataList : [];



    return(
    
        <div>


            <Table>
                <TableHead>
                <TableRow>
                    <TableCell align="center">
                        Avatar
                    </TableCell>
                    <TableCell>
                        <TableSortLabel active={true} direction='asc' >
                            Name
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Sex&nbsp;</TableCell>
                    <TableCell align="right">Rank&nbsp;(g)</TableCell>
                    <TableCell align="right">Start Date&nbsp;(g)</TableCell>
                    <TableCell align="right">Phone&nbsp;(g)</TableCell>
                    <TableCell align="right">Email&nbsp;(g)</TableCell>
                    <TableCell align="right">Superior&nbsp;(g)</TableCell>
                    <TableCell align="right"># of D.S&nbsp;</TableCell>
                    <TableCell align="center">&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {dataList.map(row => (
                    <TableRow hover tabIndex={-1} key={row._id}>
                        <TableCell align="center"> <Avatar aria-label="army" src={army} className={classes.bigAvatar}/></TableCell>
                        <TableCell  component="th" scope="row">
                            {row.firstName + " " + row.lastName}
                        </TableCell>
                        <TableCell align="right">{row.sex}</TableCell>
                        <TableCell align="right">{row.rank}</TableCell>
                        <TableCell align="right">{row.starDate}</TableCell>
                        <TableCell align="right">{row.phone}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.superior}</TableCell>
                        <TableCell align="right">2</TableCell>
                        <TableCell align="center">
                      
                        <Tooltip title="Edit User" aria-label="editUser">
                            <IconButton
                            edge="start"
                            className={classes.menuButton}
                            aria-label="Edit"
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete User" aria-label="deleteUser">
                            <IconButton
                            edge="start"
                            className={classes.menuButton}
                            aria-label="Delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                    </TableCell>
               
                    </TableRow>
                ))}
                   
                </TableBody>
            </Table>
        </div>


    )


}

export default DataTable;