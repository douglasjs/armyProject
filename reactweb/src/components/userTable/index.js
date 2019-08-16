import React from 'react';
import TableTools from './tableTools';
import DataTable from './dataTable';
import Msg from './msg'

class UserTable extends React.Component {



    componentDidMount(){
        const { tableSet } = this.props.tableSetReducer;
        const {rowSet,search,curPage,totalPage, sortDB} =tableSet;
        this.props.setTable(rowSet,search,curPage,totalPage, sortDB);  
        this.props.getDataList(rowSet, curPage, search, sortDB );
    }

    //transfer the setTable action to child component
    handleSetTable = (rowSet,search,curPage,totalPage, sortDB) => {
        this.props.setTable(rowSet,search,curPage,totalPage, sortDB);
    }
    //transfer the getDatalist action to child component
    handleGetDataList = (rowSet, page, serach, sortString ) =>{
        this.props.getDataList(rowSet, page, serach, sortString );
    }


    render(){

        const { data, err, isLoading} = this.props.datatableReducer;
        const { tableSet } = this.props.tableSetReducer;
        console.log(data);

        return(

            <div>
       

         
                <TableTools tableSet = {tableSet} 
                            action = {this.handleSetTable} 
                            history={this.props.history} 
                            getList={this.handleGetDataList}/>

                <Msg type ='LOADING'  value = {isLoading} text='Loading'/> 
                <Msg type ='ERROR' value = {err} text= 'Opps! Error : ' />

                { (!err && !isLoading) &&
                <DataTable  data = {data} 
                            tableSet = {tableSet}  
                            action = {this.handleSetTable}
                            history={this.props.history}
                            getList= {this.handleGetDataList} 
                            delete = {this.props.deleteData} />
                }
                
            </div>
    
        )


    }




}

export default UserTable;