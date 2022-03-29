import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export class Login extends Component {
render(){
    return(
    <div>


    <div class="card text-white bg-secondary mb-3" style= {{maxWidth: 20 + 'rem'}} align='center'>
  <div class="card-header">Demo Application</div>
  <div class="card-body">
    <p class="card-text">
    <Link className="btn btn-primary" to={'/register'}>
              Register
              <i className="fas fa-chevron-right" />
              </Link>
    </p>
    <p class="card-text">
    <Link className="btn btn-primary" to={'/login'}>
              Login
              <i className="fas fa-chevron-right" />
              </Link>
    </p>
  </div>
</div>
    </div>);
}
}
export default Login;
/*


*/