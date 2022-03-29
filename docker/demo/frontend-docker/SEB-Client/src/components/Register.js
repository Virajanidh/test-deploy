import React, { Component } from 'react';
import axios from "axios"
import qs from 'qs';
import Login from './Login.js'

export class Register extends Component {

    constructor(props){
        super(props)
        this.state={
            language : "",
            institutionId : 1,
            name : "",
            surname : "",
            username : "",
            email: "",
            timezone : "",
            newPassword : "",
            confirmNewPassword :"",
            issuccessfulreg:false
        }
        this.handleChange = this.handleChange.bind(this)
    this.onSubmit =this.onSubmit.bind(this)
    }

    handleChange=(e)=>{
        this.setState({
        [e.target.name] : e.target.value
        })
        console.log(e.target.name , ":", e.target.value)
    }

    
    onSubmit = async (e) =>{
        e.preventDefault();
        var reg=false;
        const data = { "institutionId": this.state.institutionId,

        "name": this.state.name,
        "language": this.state.language,
        "surname":this.state.surname,
        "username":this.state.username,
        "email": this.state.email,
        "timezone": this.state.timezone,
        "newPassword": this.state.newPassword,
        "confirmNewPassword": this.state.confirmNewPassword
      };

       await axios({
            method: "post",
          // url: "http://localhost:8080/admin-api/v1/register",
           url: "/admin-api/v1/register",
            data: qs.stringify(data),
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
          })
            .then((response)=> {
              //handle success
              console.log(response);
              reg =true
              //document.querySelector('#errormsg').textContent=response.data['username'];
              document.querySelector('#errormsg').textContent="Login success. your post "+response.data['userRoles'][0];
            })
            .catch((err) => {
                console.log(err.response.data); // you can get the response like this
                console.log(err.response.status); // status code of the request
               
                document.querySelector('#errormsg').textContent=err.response.data[0]["systemMessage"];
            }) 
            this.setState({issuccessfulreg:reg});
    }


  render() {
    if(this.state.issuccessfulreg){
      return (
      <div><Login/></div>);
    }
    else{
    return (
      <div className="container">
          <h3>Register Users</h3>

          <p class="text-warning" id='errormsg'></p> 
          
          <form id="searchForm"onSubmit={this.onSubmit} >
            <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4" text-align="left">Language</label>
                <input type="text" class="form-control" id="language"  
                placeholder="Enter the language" name = "language" onChange={this.handleChange}/>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4" text-align="left">Institution Id</label>
                <input type="text" class="form-control" id="institutionId"  
                placeholder="Enter the institutionId" name = "institutionId" onChange={this.handleChange}/>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4" text-align="left">Name </label>
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" 
                placeholder="Enter the name" name = "name" onChange={this.handleChange}/>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4" text-align="left">Surame </label>
                <input type="text" class="form-control" id="surname" aria-describedby="emailHelp" 
                placeholder="Enter the surname" name = "surname" onChange={this.handleChange}/>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4" text-align="left">Username </label>
                <input type="text" class="form-control" id="username" aria-describedby="emailHelp" 
                placeholder="Enter the username" name = "username" onChange={this.handleChange}/>
              </div>
            
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4" text-align="left">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" 
                placeholder="Enter the email" name = "email" onChange={this.handleChange} />
              </div>
            
              <div class="form-group">
                <label for="exampleTextarea" class="form-label mt-4">time zone</label>
                <input type="text" class="form-control" id="timezone" aria-describedby="emailHelp" 
                placeholder="Enter the timezone" name = "timezone" onChange={this.handleChange} />
              </div>
              

              <div class="form-group">
                <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                <input type="password" class="form-control" id="newPassword" 
                placeholder="new Password" name ="newPassword" onChange={this.handleChange}/>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" class="form-label mt-4">confirm Password</label>
                <input type="password" class="form-control" id="confirmNewPassword" 
                placeholder="confirm New Passwordnew Password" name ="confirmNewPassword" onChange={this.handleChange}/>
              </div>

            <button type="submit" className="btn btn-primary btn-bg mt-3"   > 
            Register
            </button>
            
          </form>


      </div>
    );
    }
   
  }
}


export default Register;