const initState = {
    isLoading: false,
    data: [],
    err: null
};



const dataList = (state= initState, action) =>{


    const GET_ACTION =  {
         ...state,
         data : action.data,
         err : action.err,
         isLoading:  action.isLoading
    }

    

    switch(action.type) {

         case 'GET_ALL_START' :
                    return GET_ACTION;
         case 'GET_ALL_SUCCESS' :
                    return GET_ACTION;
         case 'GET_ALL_ERROR' :
                    return GET_ACTION;
         case 'CREATE_ALL_START' :
                    return GET_ACTION;
         case 'CREATE_ALL_SUCCESS' :
                     return GET_ACTION;
         case 'CREATE_ALL_ERROR' :
                    return GET_ACTION;
         case 'EDIT_ALL_START' :
                    return GET_ACTION;
         case 'EDIT__ALL_SUCCESS' :
                    return GET_ACTION;
         case 'EDIT__ALL_ERROR' :
                    return GET_ACTION;
         case 'DELETE_ALL_START' :
                    return GET_ACTION;
         case 'DELETE_ALL_SUCCESS' :
                    return GET_ACTION;
         case 'DELETE_ALL_ERROR' :
                    return GET_ACTION;
         default:
                    return state;
    } 
    

}

export default dataList;

