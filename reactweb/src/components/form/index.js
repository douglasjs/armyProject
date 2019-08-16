import React from 'react';

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


import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import EditIcon from '@material-ui/icons/Edit'

import flag from '../../img/flag2.png';


class Form extends React.Component{

    constructor(props){

        super(props);
        this.state={
            firstName: '',
            lastName: '',
            sex: '',
            rank: '',
            startDate: '2019-01-01',
            phone: '',
            email: '',
            superior: '',
            DS: ''
        }


    }

    handleChange = name => event => {

        this.setState({ ...this.state, [name]: event.target.value });
    };



   handlePhone = name => event => {
      this.setState({ ...this.state, [name]: event });
   };
   
    render(){

        const action = this.props.match.params.action;
      
        return(

            <div>
                
    
                    <form noValidate autoComplete="off">
                      <div className='editCard'>
                 
         
                              <Card>


                             <div>

                             <Grid container spacing={1}>
                             
                                    <Grid item xs={6}>


                                      <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                              <AppBar position="static" color="default">
                                                <Toolbar>
                                                  <Typography variant="h6" color="inherit">
                                                    {action} User 
                                                  </Typography>
                                                </Toolbar>
                                              </AppBar>
  

                                        </Grid>
                                      </Grid>


                                      <Grid container spacing={1}>

                                        <Grid item xs={2} className='centerIcon'>
                                  
                                        </Grid>

                                        <Grid item xs={8} className='centerIcon'>
                                            <CardMedia
                                              component="img"
                                              alt="Contemplative Reptile"
                                              height="300"
                                              image={flag}
                                              title="Contemplative Reptile"
                                            />
                                        </Grid>

                                        <Grid item xs={2} className='centerIcon'>
                                  
                                        </Grid>
                                      </Grid>

                                      <Grid container spacing={1}>
                                        <Grid item xs={12} className='centerIcon'>
                                            
                                            <Button variant="contained" color="default">
                                              Upload
                                              <CloudUploadIcon className='rightIcon'/>
                                            </Button>
                                        </Grid>
                                      </Grid>

                                    </Grid>
                                    <Grid item xs={6}>



                                        <Grid container spacing={1}>
                                          <Grid item xs={6}>
                                            <FormControl>
                                                <TextField
                                                  id="standard-name"
                                                  label="Last Name"
                                                  value={this.state.lastName}
                                                  onChange={this.handleChange('lastName')}
                                                  margin="normal"
                                            
                                                />
                                            <FormHelperText  error>Please input last name </FormHelperText>
                                                
                                            </FormControl>
                                          </Grid>         
                                          <Grid item xs={6}>
                                                <FormControl>
                                                  
                                                  <TextField
                                                    id="standard-name"
                                                    label="First Name"
                                            
                                                    value={this.state.firstName}
                                                    onChange={this.handleChange('firstName')}
                                                    margin="normal"
                                                
                                                  />
                                                    <FormHelperText  hidden error>Please input first name </FormHelperText>
                                                  
                                                </FormControl>
                                          </Grid>
                                      
                                        </Grid>

                                        <Grid container spacing={1}>
                                        <Grid item xs={4}>

                                              <FormControl>
                                                <InputLabel  htmlFor="sex">
                                                  Sex
                                                </InputLabel>
                                                <Select
                                                  native
                                                  value={this.state.sex}
                                                  onChange={this.handleChange('sex')}

                                                >
                                                  <option value="" />
                                                  <option value='Male'>Male</option>
                                                  <option value='Femal'>Femal</option>
                                                </Select>
                                                <FormHelperText hidden>Must choose the sex</FormHelperText>
                                              </FormControl>

                                              </Grid>
                                              <Grid item xs={4}>

                                                  <FormControl>
                                                    <InputLabel  htmlFor="rank">
                                                      Rank
                                                    </InputLabel>
                                                    <Select
                                                      native
                                                      value={this.state.rank}
                                                      onChange={this.handleChange('rank')}

                                                    >
                                                      <option value="" />
                                                      <option value='Genernal'>Genernal</option>
                                                      <option value='Femal'>Femal</option>
                                                    </Select>
                                                    <FormHelperText hidden>Must choose the sex</FormHelperText>
                                                  </FormControl>


                                              </Grid>
                                              <Grid item xs={4}>

                                                <FormControl>
                                                
                                                  <TextField
                                                        id="startDate"
                                                        label="Start Date"
                                                        type="date"
                                                
                                                        value= {this.state.startDate}
                                                        onChange={this.handleChange('startDate')}
                                                        InputLabelProps={{
                                                          shrink: true,
                                                        }}
                                                      />
                                                </FormControl>


                                              </Grid>
                                      
                                        </Grid>


                                        <Grid container spacing={1}>

                                        <Grid item xs={6}>
                                          <FormControl>
                                            
                                                <MuiPhoneNumber label='Phone Number' defaultCountry={'us'} value={this.state.phone} onChange={this.handlePhone('phone')}/>
                                                <FormHelperText hidden>Must choose the sex</FormHelperText>
                                          </FormControl>
    
                                        </Grid>
                                        <Grid item xs={6}>
            
          
                                                    <FormControl>
                                                      <InputLabel  htmlFor="superior">
                                                          Superior
                                                      </InputLabel>
                                                      <Select
                                                        native
                                                        value={this.state.superior}
                                                        onChange={this.handleChange('superior')}
                                                        
                                                      >
                                                        <option value="">       </option>
                                                        <option value='Genernal'>123456123</option>
                                                        <option value='Femal'>1234561ss12</option>
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
                                                    value={this.state.email}
                                                    onChange={this.handleChange('email')}
                                                    margin="normal"
                                                
                                                  />
                                                    <FormHelperText  hidden error>Please input email</FormHelperText>
                                                  
                                              </FormControl>


                                          </Grid>

                                        </Grid>



                                        <Grid container spacing={1}>
                                        <Grid item xs={12}>

                                              <Button variant="contained"  color="primary">
                                                <SaveIcon />
                                                  Save
                                              </Button>
                                              &nbsp;&nbsp;
                                              <Button variant="contained"  color="secondary">
                                              <ArrowDownwardIcon />
                                                  Cancel
                                              </Button>


                                          </Grid>

                                        </Grid>


                                    </Grid>
                              </Grid>


                             </div>

                              <div >


                         


                                 <Grid container spacing={1}>
                                    <Grid item xs={4}>

                                    </Grid>         
                                    <Grid item xs={4}>
                                 
                                     </Grid>
                                     <Grid item xs={4}>

                                     </Grid>
                        

 
                                </Grid>
                              </div>


                              <div>
                                 <Grid container spacing={1}>
                                    <Grid item xs={4}>

                                    </Grid>         
                                    <Grid item xs={6}>
                              
                                      <Grid container spacing={1}>
                                     

                                      </Grid>
                                 
                          
    

                                  
                                     </Grid>
                        

 
                                </Grid>
                              </div>


                              <div>
                                 <Grid container spacing={1}>
                                    <Grid item xs={4}>


                                    </Grid>         
                           
                        

 
                                </Grid>
                              </div>


                              <div>
                                 <Grid container spacing={1}>
                                    <Grid item xs={4}>


                                    </Grid>         

                                     <Grid item xs={4}>
                           


                                  
                                     </Grid>
                        

 
                                </Grid>
                              </div>


                              <div>
                                 <Grid container spacing={1}>
                                    <Grid item xs={4} className='centerIcon'>



                                    </Grid>         
                                    <Grid item xs={4}>



                                     </Grid>
                                     <Grid item xs={4}>
                           


                                  
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
