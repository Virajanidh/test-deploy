import React, { Component } from 'react';
import axios from "axios"
import qs from 'qs';


export class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            username : "",
            password: "",
            newtoken: '',
            userdetails:[],
            islogged:false
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
        var token2='';
        const data = { 
        "username": this.state.username,
        "password": this.state.password,
        "grant_type":"password",
        "client_id": "guiClient",
        "client_secret": "somePW",
        "scope": "read write"
      };
      const data2 ={
        "username": "guiClient",
        "password":"somePW"
      }

       await axios({
          method: "post",
         //  url: "http://localhost:8080/oauth/token",
           url: "/oauth/token",
        
            data: qs.stringify(data),
            auth:{
              "username": "guiClient",
              "password":"somePW"
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
          })
            .then(function (response) {
              console.log(response)
              console.log(response.data.access_token)
              token2 = response.data.access_token
              //this.setState({newtoken :token});
              //document.querySelector('#errormsg').textContent=response.data['username'];
              document.querySelector('#errormsg').textContent="Access tokent sent ";
              
            })
            .catch((err) => {
                console.log(err); // you can get the response like this
                console.log(err.response.status); // status code of the request
               
                document.querySelector('#errormsg').textContent=err.response.data;
            }) 

            this.setState({newtoken :token2});
            console.log(this.state.newtoken);
            var userdetails=[];
            if(token2!=''){
              var islogged =false;
              await axios({
                method: "get",
               url: "/admin-api/v1/useraccount/me",
             //  url: "http://localhost:8080/admin-api/v1/useraccount/me",
                
                headers: { "Authorization": `Bearer ${token2}`},
              })
                .then(function (response) {
                  console.log(response)
                  console.log(response.data)
                  userdetails = response.data
                  islogged=true;
                  //this.setState({newtoken :token});
                  //document.querySelector('#errormsg').textContent=response.data['username'];
                  document.querySelector('#errormsg').textContent="Access tokent sent ";
                  
                })
                .catch((err) => {
                    console.log(err); // you can get the response like this
                    console.log(err.response.status); // status code of the request
                    console.log(err.response.data)
                  
                    document.querySelector('#errormsg').textContent=err.response.data.error;
                })
                this.setState({
                  userdetails:userdetails,
                  islogged:islogged
                });
            }

    }


  render() {
    if(this.state.islogged){
      let details =this.state.userdetails
      return(
        
           <div className="container">
        <div className="row">
          <div className="col-md-8">

            <ul className="list-group">
              <li className="list-group-item">
                <strong>name:</strong> {details.name}
              </li>
              <li className="list-group-item">
                <strong>surname:</strong> {details.surname}
              </li>
              <li className="list-group-item">
                <strong>username:</strong> {details.username}
              </li>
              <li className="list-group-item">
                <strong>UUID:</strong> {details.uuid}
              </li>
              <li className="list-group-item">
                <strong>Institution Id:</strong> {details.institutionId}
              </li>
              <li className="list-group-item">
                <strong>creation Date:</strong> {details.creationDate}
              </li>
              <li className="list-group-item">
                <strong>email:</strong> {details.email}
              </li>
              <li className="list-group-item">
                <strong>active:</strong> {details.active}
              </li>
              <li className="list-group-item">
                <strong>language:</strong> {details.language}
              </li>
              <li className="list-group-item">
                <strong>timezone:</strong> {details.timezone}
              </li>
              <li className="list-group-item">
                <strong>userRoles:</strong> {details.userRoles}
              </li>
            </ul>
          </div>
        </div>
        </div>
      );

    }
    else{
      return (
        <div className="container">
            <h3>Login</h3>

            <p class="text-warning" id='errormsg'></p> 
            
            <form id="searchForm"onSubmit={this.onSubmit} >
              
                <div class="form-group">
                  <label for="exampleInputEmail1" class="form-label mt-4" text-align="left">Username </label>
                  <input type="text" class="form-control" id="username" aria-describedby="emailHelp" 
                  placeholder="Enter the username" name = "username" onChange={this.handleChange}/>
                </div>
                

                <div class="form-group">
                  <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                  <input type="password" class="form-control" id="password" 
                  placeholder="password" name ="password" onChange={this.handleChange}/>
                </div>
              

              <button type="submit" className="btn btn-primary btn-bg mt-3"   > 
              Login
              </button>
              
            </form>


        </div>
      );
    }
  }
}


export default Login;

/*

import React, { Component } from 'react';
import axios from "axios"
import qs from 'qs';


export class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            username : "",
            password: "",
            newtoken: '',
            userdetails:[],
            islogged:false
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
        var token2='';
        const data = { 
        "username": this.state.username,
        "password": this.state.password,
        "grant_type":"password",
        "client_id": "guiClient",
        "client_secret": "somePW",
        "scope": "read write"
      };
      const data2 ={
        "username": "guiClient",
        "password":"somePW"
      }

       await axios({
            method: "post",
           // url: "http://localhost:3001/http://localhost:8080/oauth/token",
            url: "/oauth/token",
        
            data: qs.stringify(data),
            auth:{
              "username": "guiClient",
              "password":"somePW"
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
          })
            .then(function (response) {
              console.log(response)
              console.log(response.data.access_token)
              token2 = response.data.access_token
              //this.setState({newtoken :token});
              //document.querySelector('#errormsg').textContent=response.data['username'];
              document.querySelector('#errormsg').textContent="Access tokent sent ";
              
            })
            .catch((err) => {
                console.log(err); // you can get the response like this
                console.log(err.response.status); // status code of the request
               
                document.querySelector('#errormsg').textContent=err.response.data;
            }) 

            this.setState({newtoken :token2});
            console.log(this.state.newtoken);
            var userdetails=[];
            if(token2!=''){
              var islogged =false;
              await axios({
                method: "get",
               url: "/admin-api/v1/useraccount/me",
               // url: "http://localhost:3001/http://localhost:8080/admin-api/v1/useraccount/me",
                
                headers: { "Authorization": `Bearer ${token2}`},
              })
                .then(function (response) {
                  console.log(response)
                  console.log(response.data)
                  userdetails = response.data
                  islogged=true;
                  //this.setState({newtoken :token});
                  //document.querySelector('#errormsg').textContent=response.data['username'];
                  document.querySelector('#errormsg').textContent="Access tokent sent ";
                  
                })
                .catch((err) => {
                    console.log(err); // you can get the response like this
                    console.log(err.response.status); // status code of the request
                    console.log(err.response.data)
                  
                    document.querySelector('#errormsg').textContent=err.response.data.error;
                })
                this.setState({
                  userdetails:userdetails,
                  islogged:islogged
                });
            }

    }


  render() {
    if(this.state.islogged){
      let details =this.state.userdetails
      return(
        
           <div className="container">
        <div className="row">
          <div className="col-md-8">

            <ul className="list-group">
              <li className="list-group-item">
                <strong>name:</strong> {details.name}
              </li>
              <li className="list-group-item">
                <strong>surname:</strong> {details.surname}
              </li>
              <li className="list-group-item">
                <strong>username:</strong> {details.username}
              </li>
              <li className="list-group-item">
                <strong>UUID:</strong> {details.uuid}
              </li>
              <li className="list-group-item">
                <strong>Institution Id:</strong> {details.institutionId}
              </li>
              <li className="list-group-item">
                <strong>creation Date:</strong> {details.creationDate}
              </li>
              <li className="list-group-item">
                <strong>email:</strong> {details.email}
              </li>
              <li className="list-group-item">
                <strong>active:</strong> {details.active}
              </li>
              <li className="list-group-item">
                <strong>language:</strong> {details.language}
              </li>
              <li className="list-group-item">
                <strong>timezone:</strong> {details.timezone}
              </li>
              <li className="list-group-item">
                <strong>userRoles:</strong> {details.userRoles}
              </li>
            </ul>
          </div>
        </div>
        </div>
      );

    }
    else{
      return (
        <div className="container">
            <h3>Login</h3>

            <p class="text-warning" id='errormsg'></p> 
            
            <form id="searchForm"onSubmit={this.onSubmit} >
              
                <div class="form-group">
                  <label for="exampleInputEmail1" class="form-label mt-4" text-align="left">Username </label>
                  <input type="text" class="form-control" id="username" aria-describedby="emailHelp" 
                  placeholder="Enter the username" name = "username" onChange={this.handleChange}/>
                </div>
                

                <div class="form-group">
                  <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                  <input type="password" class="form-control" id="password" 
                  placeholder="password" name ="password" onChange={this.handleChange}/>
                </div>
              

              <button type="submit" className="btn btn-primary btn-bg mt-3"   > 
              Login
              </button>
              
            </form>


        </div>
      );
    }
  }
}


export default Login;

*/