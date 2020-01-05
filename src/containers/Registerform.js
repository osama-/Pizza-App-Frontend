import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../constants';
import {setToken} from '../actions';

class Registerform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if( this.props.customer.hasOwnProperty('token') ){
            this.props.history.push("/");
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const {name, email, password, confirm} = this.state;
        const {btn} = this.refs;
        const {history, setToken} = this.props;
        if( !name.length || !email.length || !password.length || !confirm.length) return false;
        if( password !== confirm ) return false;
        btn.setAttribute("disabled", "disabled");
        axios.post(API_URL+'/register',{
            name,
            email,
            password,
            c_password: confirm
        }).then(function (response) {
            btn.removeAttribute("disabled");
            if( response.data.hasOwnProperty('success') ){
                setToken(response.data.success.token);
                history.push("/");
            }
        })
        .catch(function (error) {
            btn.removeAttribute("disabled");
            console.log(error);
        })
    }

  render() {
      return (
        <div className="login-form">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" name="name" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm Password" name="confirm" onChange={this.handleInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary w-100" ref="btn">Create account</button>
                </form>
        </div>
      );
  }
}
function mapStateToProps(state) {
    return {
        customer: state.customer
    };
}

function mapDispatchToProps(dispatch) {
return bindActionCreators({setToken}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registerform));