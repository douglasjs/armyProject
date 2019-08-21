import axios from 'axios';

const getAllStart = () =>{

    return {

        type: "GET_ALL_START",
        data: {},
        err: null,
        isLoading: true,
    }

}

const getAllSuccess = (response) =>{

    return {

        type: "GET_ALL_SUCCESS",
        data: response,
        err: null,
        isLoading: false,
    }

}

const getMore = (response) =>{

    return {

        type: "GET_MORE",
        data: response,
        err: null,
        isLoading: false,
    }

}



const getAllError = (error) =>{

    return {
        type: "GET_ALL_ERROR",
        data: {},
        err: error,
        isLoading: false,
    }

}

const createAllStart = () =>{

    return {

        type: "CREATE_ALL_START",
        data: {},
        err: null,
        isLoading: true,
    }

}


const createAllSuccess = (response) =>{

    return {

        type: "CREATE_ALL_SUCCESS",
        data: response,
        err: null,
        isLoading: false,
    }

}

const createAllError = (error) =>{

    return {
        type: "CREATE_ALL_ERROR",
        data: {},
        err: error,
        isLoading: false,
    }

}


const editAllStart = () =>{

    return {

        type: "EDIT_ALL_START",
        data: {},
        err: null,
        isLoading: true,
    }

}

const editAllSuccess = (response) =>{

    return {

        type: "EDIT_ALL_SUCCESS",
        data: response,
        err: null,
        isLoading: false,
    }

}



const editAllError = (error) =>{

    return {
        type: "EDIT_ALL_ERROR",
        data: {},
        err: error,
        isLoading: false,
    }

}



const deleteAllStart = () =>{

    return {

        type: "DELETE_ALL_START",
        data: {},
        err: null,
        isLoading: true,
    }

}


const deleteAllSuccess = (response) =>{

    return {

        type: "DELETE_ALL_SUCCESS",
        data: response,
        err: null,
        isLoading: false,
    }

}

const deleteAllError = (error) =>{

    return {
        type: "DELETE_ALL_ERROR",
        data: {},
        err: error,
        isLoading: false,
    }

}


const setTable = (data) =>{

    return {
        type: "SET_TABLE",
        tableSet: data
    }

}

const getMoreList = (rowSet, curPage, search,totalPage,sortDB ) =>{

    return (dispatch) =>{

        axios({ method: 'get', url: 'http://localhost:8888/api/users', params:{pageSize: rowSet, pageNo: curPage, query: search, sort : sortDB} })
        .then(response => {
            dispatch(getMore(response.data));
            dispatch(setTable({rowSet, curPage, search,totalPage,sortDB}));

        })
        .catch(err => {
            dispatch(getAllError(err));
        });

    }

}

const getSuperior = ( superiorID , superiorType) =>{


    return (dispatch) =>{

        
        dispatch(getAllStart());
        axios({ method: 'get',  url: `http://localhost:8888/api/users/${superiorID}`,params:{ superiorType } })
        .then(response => {
            dispatch(getAllSuccess(response.data));
            dispatch(setTable({rowSet: 5, curPage: 1, search: '',totalPage: 1,sortDB: {modifyDate : -1}}));
        })
        .catch(err => {
            dispatch(getAllError(err));
        });

    }

}



const getDataList = (rowSet, curPage, search,totalPage,sortDB ) =>{

 
    return (dispatch) =>{
        
      
        dispatch(getAllStart());
        axios({ method: 'get', url: 'http://localhost:8888/api/users', params:{pageSize: rowSet, pageNo: curPage, query: search, sort : sortDB} })
            .then(response => {
          
                dispatch(getAllSuccess(response.data));
                if(rowSet !== 9999 ){
                    dispatch(setTable({rowSet, curPage, search,totalPage,sortDB}));
                }


            })
            .catch(err => {
                dispatch(getAllError(err));
            });
    }

}

const createData = (data, handleBack) =>{

   
    return (dispatch) =>{
        
      
            dispatch(createAllStart());
            axios({
                method: 'post',
                url: 'http://localhost:8888/api/users',
                data
            })
            .then((response)=>{
                dispatch(createAllSuccess(response.data));
                handleBack();})
            .catch(err => {
                dispatch(createAllError(err));
            });
    }

}


const updateData = (data, handleBack) =>{

   
    return (dispatch) =>{
        
      
            dispatch(editAllStart());
            axios({
                method: 'put',
                url: `http://localhost:8888/api/users/${data.id}`,
                data
            })
            .then((response) => {
                dispatch(editAllSuccess(response.data));
                handleBack();

            })
            .catch(err => {
                dispatch(editAllError(err));
            });
    }

}


const deleteData = (data, rowSet, curPage, search, totalPage,sortDB) =>{

 
    return (dispatch) =>{
        
      
            
            dispatch(deleteAllStart());
            
            axios
            .delete(`http://localhost:8888/api/users/${data.id}`,{ crossdomain: true })
            .then((response) => {
                        dispatch(deleteAllSuccess(response.data));
                        dispatch(setTable({rowSet, curPage, search, sortDB}));
                        
            })
            .then(()=>{

                dispatch(getDataList(rowSet, curPage, search ,totalPage ,sortDB));

            })
            .catch(err => {
                dispatch(deleteAllError(err));
            });
    }

}



export  {getDataList,createData,deleteData, updateData, getMoreList,getSuperior};