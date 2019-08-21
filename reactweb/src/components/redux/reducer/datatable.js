const initState = {
    isLoading: false,
    data: {},
    err: null
};



const dataList = (state= initState, action) =>{


   
    if(action.type !== 'SET_TABLE'){

       
/*         const GET_ACTION =  {
            ...state,
           // data :  state.data.dataList && action.data.dataList? {...state.data, dataList : [...state.data.dataList, ...action.data.dataList] } : 
           //         {...state.data, ...action.data},
            data: action.data,
            err : action.err,
            isLoading:  action.isLoading
       } */

       const GET_ACTION ={
            ...state,
            data : action.data,
            err : action.err,
            isLoading:  action.isLoading
       };

       const GET_ACTION_NODATA ={
            ...state,
            err : action.err,
            isLoading:  action.isLoading
       };
   
       switch(action.type) {
   
            case 'GET_ALL_START' :
                        return  GET_ACTION_NODATA;
            case 'GET_MORE' :
                        return {
                            ...state,
                            data : {...state.data,  dataList :[ ...state.data.dataList, ...action.data.dataList  ] , pageNo : action.data.pageNo },
                            err : action.err,
                            isLoading:  action.isLoading
                        }

            case 'GET_ALL_SUCCESS' :

                        return  GET_ACTION;
                    
            /*
                        let fetchData;
                        if (action.data.pageNo !==1){
                            if(state.data.pageNo !== action.data.pageNo ){
                                fetchData= {...action.data, dataList : [...state.data.dataList,  ...action.data.dataList]};
                            }else{
                                fetchData= state.data;
                            }
                            
                        }else{
                            fetchData=action.data;
                        }

                        return {
                            ...state,
                            data: fetchData,
                            err : action.err,
                            isLoading:  action.isLoading
                        };
            */
            case 'GET_ALL_ERROR' :
                        return GET_ACTION;
            case 'CREATE_ALL_START' :
                        return GET_ACTION_NODATA;
            case 'CREATE_ALL_SUCCESS' :
                        return GET_ACTION;
            case 'CREATE_ALL_ERROR' :
                        return GET_ACTION;
            case 'EDIT_ALL_START' :
                        return GET_ACTION_NODATA;
            case 'EDIT__ALL_SUCCESS' :
                        return GET_ACTION;
            case 'EDIT__ALL_ERROR' :
                       return GET_ACTION;
            case 'DELETE_ALL_START' :
                       return GET_ACTION_NODATA;
            case 'DELETE_ALL_SUCCESS' :
                       return GET_ACTION;
            case 'DELETE_ALL_ERROR' :
                       return GET_ACTION;
            default:
                       return state;
       } 
       

    }else{
        return state;

    }

  

}

export default dataList;

