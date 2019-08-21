
const setTable = (data) =>{

    return {
        type: "SET_TABLE",
        tableSet: data
    }

}


const setTableAction = (rowSet,search,curPage,totalPage,sortDB) =>{

 
    return  (dispatch) =>{

        dispatch(setTable({ rowSet,
                            search,
                            curPage,
                            totalPage,
                            sortDB
                        }));
       
    }

}


export default setTableAction;