import React from 'react';


// material UI
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiPhoneNumber from 'material-ui-phone-number';
import CardMedia from '@material-ui/core/CardMedia';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// material UI icon
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home'

// image
import army from '../../img/army.png';

// message
import Msg from './msg'


class Form extends React.Component{

    constructor(props){

        super(props);
        this.state={
            id : {value: '' },
            firstName: {value: '', validate: false },
            lastName: {value: '', validate: false },
            sex: {value: '', validate: false },
            rank: {value: '', validate: false },
            startDate: {value: '', validate: false },
            phone: {value: '', validate: false },
            email: {value: '', validate: false },
            superiorID: {value: ''},
            superior: {value: ''},
            image : { value: '', file : null },
            subordinates : {value : []}
        }


    }

    componentDidMount(){


        if(this.props.location.state){
          
            const { _id, firstName, lastName, sex, rank, startDate, phone, 
                    email, superiorID, superior, image, subordinates } = this.props.location.state;


            const startDateLocal = startDate.split('T')[0];
            const superiorIDLocal = superiorID ? superiorID : '';

            this.setState({
                ...this.state,
                id : {value: _id },
                firstName: {value: firstName, validate: false },
                lastName: {value: lastName, validate: false },
                sex: {value: sex, validate: false },
                rank: {value: rank, validate: false },
                startDate: {value: startDateLocal, validate: false },
                phone: {value: phone, validate: false },
                email: {value: email, validate: false },
                superiorID: {value: superiorIDLocal},
                superior: {value: superior},
                image : { value: image, file : null },
                subordinates : {value : subordinates}
                
            });
        }


        this.props.getDataList(9999);


    }


    checkNotEmpty(){

      for(const [key, value] of Object.entries(this.state) ){
        if(!(key === 'superiorID' || key === 'DS' || key === 'image' || key === 'subordinates' 
                          || key === 'superior' || key === 'id' ) ){

            if(value.value === ''){
                return false;
            }
         
        }
      }


      return true;

    }

    handleBack = () => {
      this.props.history.push('/');
    }

    handleChange = name => event => {


      
        let newValue='';
        if(name==='phone'){
          newValue=event;
        }else{
          newValue=event.target.value;
        }


        

        if(newValue === '' || newValue === '+'){
             
             
              if(name ==='superiorID'){
                
                this.setState({ ...this.state, 
                                [name]: { value: ''}, 
                                superior : { value: '' } });
              }else{
             
                this.setState({ ...this.state, [name]: { value: newValue,  validate: true} });
              }

        }else{

              if(name ==='superiorID'){
                
                const text = newValue ? event.target[event.target.selectedIndex].text : '' ;
                this.setState({ ...this.state, 
                                [name]: { value: newValue}, 
                                superior : { value: text } });
              }else{
             
                this.setState({ ...this.state, [name]: { value: newValue, validate: false} });
              }
              
        }

    
      
     
    };



    handleImageChange = (e)  =>{

          
          let file = e.target.files[0];
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
              this.setState( {...this.state,
                    image: {
                      file: URL.createObjectURL(file),
                      value : reader.result
                    }
              });
          };

    }



   handleSubmit = (action)  => {

      if(this.checkNotEmpty()){

          let userData = {};

          for(const [key, value] of Object.entries(this.state) ){
               
                if(value.value){
                  userData[key]= value.value;
                }
          }

          

          const { tableSet } = this.props.tableSetReducer;
          const {rowSet,search,totalPage} = tableSet;


          delete userData['subordinates'];

          if(action.trim() === 'Create'){
              delete userData['id'];
              this.props.setTable(rowSet,search,1 ,totalPage, {modifyDate : -1});  
              this.props.createData(userData, this.handleBack);
          }
  
       
          if(action.trim() === 'Edit'){
              this.props.setTable(rowSet,search,1 ,totalPage, {modifyDate : -1});  
              this.props.updateData(userData, this.handleBack);
          }
  
  
        
          this.setState(this.baseState);
     
      }
 
 

     
    
  
   }

   
  
   render(){

       
        const { err, isLoading, data} = this.props.datatableReducer;
        const dataList = data.dataList ? data.dataList : [];
        const image = this.state.image.value ? this.state.image.value : army;
        const subordinates = this.state.subordinates.value ? [...this.state.subordinates.value, this.state.id.value]: [this.state.id.value];
        const action = this.props.match.params.action;

        return(

          <div>
            <form id='dataForm' noValidate autoComplete="off">
              <div className='editCard'>


                <Card>
                  <div>

                    <Grid container spacing={1}>

                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <AppBar position="static" color="primary">
                            <Toolbar>
                              <Typography variant="h6" color="inherit">
                                {action} User
                              </Typography>

                            </Toolbar>
                          </AppBar>
                        </Grid>
                      </Grid>

                      <Grid container spacing={1}>
                      </Grid>

                      <Grid item xs={6}>

                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                          </Grid>
                        </Grid>


                        <Grid container spacing={1}>

                          <Grid item xs={2} className='centerIcon'>
                          </Grid>

                          <Grid item xs={8} className='centerIcon'>

                    
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              image={image}
                              title="Contemplative Reptile"
                            /> 
                          </Grid>

                          <Grid item xs={2} className='centerIcon'>

                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={12} className='centerIcon'>

                            <input
                              accept="image/*"
                              style={{ display: 'none' }}
                              id="raised-button-file"
                              multiple
                              type="file"
                              onChange={this.handleImageChange}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="contained" component="span" color="default">
                                    Upload
                                    <CloudUploadIcon className='rightIcon' />
                                </Button>
                            </label>
                          
                          </Grid>
                        </Grid>

                      </Grid>
                      <Grid item xs={6}>

                      <Grid container spacing={1}>
                          <Grid item xs={12}>
                              <Msg type ='LOADING'  value = {isLoading} text='Processing ' /> 
                              <Msg type ='ERROR' value = {err} text= 'Opps! Error : ' />
                          </Grid>
                      </Grid>
                 

                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <FormControl>
                            <TextField
                                id="fname"
                                label="First Name"

                                value={this.state.firstName.value}
                                onChange={this.handleChange('firstName')}
                                margin="normal"
                                error={this.state.firstName.validate}
                                required={true}
                              />
                              <FormHelperText  
                                    error={this.state.firstName.validate} 
                                    hidden={!this.state.firstName.validate}>
                                Please input first name 
                              </FormHelperText>
                            

                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl>
                            
                              <TextField
                                id="lname"
                                label="Last Name"
                                value={this.state.lastName.value}
                                onChange={this.handleChange('lastName')}
                                margin="normal"
                                error={this.state.lastName.validate}
                                required={true}
                              />
                              <FormHelperText  
                                    error={this.state.lastName.validate} 
                                    hidden={!this.state.lastName.validate}>
                                Please input last name 
                              </FormHelperText>
                           
                            </FormControl>
                          </Grid>

                        </Grid>

                        <Grid container spacing={1} alignItems='flex-end'>
                          <Grid item xs={4}>

                            <FormControl>

                              <TextField
                                id="startDate"
                                label="Start Date"
                                type="date"

                                value={this.state.startDate.value}
                                onChange={this.handleChange('startDate')}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={this.state.startDate.validate} 
                                required={true}
                              />
                              <FormHelperText  
                                    error={this.state.startDate.validate} 
                                    hidden={!this.state.startDate.validate}>
                                Please input start Date 
                              </FormHelperText>
                            </FormControl>


                          </Grid>
                          <Grid item xs={2}>
                          </Grid>
                          <Grid item xs={2}>

                            <FormControl>
                              <InputLabel htmlFor="rank">
                                Rank*
                                                    </InputLabel>
                              <Select
                                native
                                id='rank'
                                value={this.state.rank.value}
                                onChange={this.handleChange('rank')}
                                error={this.state.rank.validate} 
                              >
                                <option value="" />
                                <option value='General'>General</option>
                                <option value='Colonel'>Colonel</option>
                                <option value='Major'>Major</option>
                                <option value='Captain'>Captain</option>
                                <option value='Lieutenant'>Lieutenant</option>
                                <option value='Chief'>Chief</option>
                                <option value='Sergeant'>Sergeant</option>
                              </Select>
                              <FormHelperText  
                                    error={this.state.rank.validate} 
                                    hidden={!this.state.rank.validate}>
                                Please input rank
                              </FormHelperText>
                            </FormControl>

                          </Grid>

                          <Grid item xs={2}>

                             <FormControl>
                              <InputLabel htmlFor="sex">
                                Sex*
                              </InputLabel>
                              <Select
                                id='sex'
                                native
                                value={this.state.sex.value}
                                onChange={this.handleChange('sex')}
                                error={this.state.sex.validate}
                              >
                                <option value="       " />
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                              </Select>
                              <FormHelperText  
                                    error={this.state.sex.validate} 
                                    hidden={!this.state.sex.validate}>
                                Please input sex
                              </FormHelperText>
                            </FormControl> 


                          </Grid>

                        </Grid>


                        <Grid container spacing={1}>

                          <Grid item xs={6}>
                            <FormControl>

                              <MuiPhoneNumber 
                                    id='phone'
                                    label='Phone Number*' 
                                    defaultCountry={'us'} 
                                    value={this.state.phone.value} 
                                    error={this.state.phone.validate} 
                                    onChange={this.handleChange('phone')}
                                    />
                              <FormHelperText  
                                    error={this.state.phone.validate} 
                                    hidden={!this.state.phone.validate}>
                                Please input phone number
                              </FormHelperText>
                            </FormControl>

                          </Grid>
                          <Grid item xs={6}>


                            <FormControl>
                              <InputLabel htmlFor="superiorID">
                                Superior
                                                      </InputLabel>
                              <Select
                                id='superiorID'
                                native
                                value={this.state.superiorID.value}
                                onChange={this.handleChange('superiorID')}

                              >
                                <option value=''> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </option>

                                {dataList.map( row=> ( 

                                    !subordinates.includes(row._id) &&
                                      <option key={row._id} value={row._id}>{row.firstName + ' ' + row.lastName}</option>)                                
                                )}

                                
                              </Select>

                            </FormControl>

                          </Grid>

                        </Grid>


                        <Grid container spacing={1}>
                          <Grid item xs={12}>

                            <FormControl>

                              <TextField
                                id="email"
                                label="Email"
                                type='email'
                                value={this.state.email.value}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                error={this.state.email.validate} 
                                required={true}
                              />
                              <FormHelperText  
                                    error={this.state.email.validate} 
                                    hidden={!this.state.email.validate}>
                                Please input Email
                              </FormHelperText>

                            </FormControl>


                          </Grid>

                        </Grid>



                        <Grid container spacing={1}>
                          <Grid item xs={12}>

                            <Button variant="contained" color="primary" id='action' type='button'  onClick={()=>this.handleSubmit(this.props.match.params.action)}>
                              <SaveIcon />
                              Save
                            </Button>
                            &nbsp;&nbsp;
                             <Button variant="contained" color="secondary" onClick={this.handleBack}>
                              <HomeIcon />
                              Go Back
                                              </Button>


                          </Grid>

                        </Grid>


                      </Grid>
                    </Grid>


                  </div>

                  <div>
                    &nbsp;
                  </div>

                </Card>
              </div>
            </form>

          </div>
        )

    }


}

export default Form; 
