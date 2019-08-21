import React from 'react';
import TableTools from './tableTools';
import DataTable from './dataTable';
import Msg from './msg'

class UserTable extends React.Component {



    componentDidMount(){
        const { tableSet } = this.props.tableSetReducer;
        const {rowSet,search,curPage,totalPage, sortDB} = tableSet;
        //const {rowSet,search,curPage,totalPage, sortDB} =tableSet;
        //this.props.setTable(rowSet,search,curPage,totalPage, sortDB);  
        this.props.getDataList(rowSet, curPage, search,totalPage,sortDB);
    }

    //transfer the setTable action to child component
    handleSetTable = (rowSet,search,curPage,totalPage, sortDB) => {
        this.props.setTable(rowSet,search,curPage,totalPage, sortDB);
    }
    //transfer the getDatalist action to child component
    handleGetDataList = (rowSet, curPage, search,totalPage,sortDB ) =>{
        this.props.getDataList(rowSet, curPage, search,totalPage,sortDB );
    }

    handleGetMoreList =(rowSet, curPage, search,totalPage,sortDB ) =>{
        this.props.getMoreList(rowSet, curPage, search,totalPage,sortDB );
    }

    handleGetSuperior =( superiorID, superiorType )=>{

        this.props.getSuperior(superiorID, superiorType);
    }



    render(){

        const { data, err, isLoading} = this.props.datatableReducer;
        const { tableSet } = this.props.tableSetReducer;
      

        return(

            <div>
       

         
                <TableTools tableSet = {tableSet} 
                            action = {this.handleSetTable} 
                            history={this.props.history} 
                            getList={this.handleGetDataList}/>

              
                <Msg type ='ERROR' value = {err} text= 'Opps! Error : ' />

                { (!err ) &&
                <DataTable  data = {data} 
                            tableSet = {tableSet}
                            setTable = {this.handleSetTable}  
                            action = {this.handleSetTable}
                            history={this.props.history}
                            getList= {this.handleGetDataList} 
                            getMoreList = {this.handleGetMoreList}
                            getSuperior = {this.handleGetSuperior} 
                            delete = {this.props.deleteData} />
                }
                 <Msg type ='LOADING'  value = {isLoading} text='Loading'/> 
                
            </div>
    
        )


    }




}

export default UserTable;