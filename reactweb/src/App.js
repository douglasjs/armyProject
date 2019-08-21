import React from 'react';
import './App.css';

// material UI
import useStyles from './components/css'
import Paper from '@material-ui/core/Paper';

// react route
import {  
    BrowserRouter,
    Route,
    Switch} from 'react-router-dom';
//Redux 
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';

//components
import UserTable from './components/userTable';
import Form from './components/userTable/form';

//redux store
import store from './components/redux/store';

//redux action
import * as searchAction from './components/redux/action';

//redux State
const mapStateToProps = (state) => {
  
    return {
      ...state
    }
  }

//redux Dispatch
const mapDispatchToProps = (dispatch) => {
    return{
          ...bindActionCreators(searchAction,dispatch)
    }
}

//redux Components
const UserTableRedux = connect(mapStateToProps, mapDispatchToProps)(UserTable);
const FormRedux = connect(mapStateToProps, mapDispatchToProps)(Form);



function App() {

    const classes = useStyles();

    return(
        <div>
             <Paper className={classes.paper}>
                         <Provider store={store}>
                            <BrowserRouter>
                              <Switch>
                                <Route exact={true} path="/" component={UserTableRedux} />
                                <Route path="/form/:action" component = {FormRedux} />
                              </Switch>
                            </BrowserRouter>
                          </Provider>
            </Paper>
        </div>

    )

}

export default App;