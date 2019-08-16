const initState = {
    tableSet :{
        rowSet: 5,
        search: '',
        curPage: 1,
        totalPage: 0,
        sortDB: {create_date : -1}
    }
};



const tableSet = (state= initState, action) =>{

    switch(action.type) {

        case 'SET_TABLE' :
                return {
                    ...state,
                    tableSet : action.tableSet
                };
        default:
                return state;

    }
        

}


export default tableSet;
