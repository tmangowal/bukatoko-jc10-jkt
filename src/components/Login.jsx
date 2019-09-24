import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const URL_API = 'http://localhost:9000/'

class Login extends React.Component {
    state = {
        inputUsername: '',
        inputPassword: '',
        inputUsernameRegister: '',
        inputPasswordRegister: '',
        inputPasswordRepeat: '',
        username: '',
        errMsg: '',
        isLoginPage: true
    }

    onBtnLogin = () => {
        Axios.get(URL_API + 'auth/login', {
            params: {
                username: this.state.inputUsername,
                password: this.state.inputPassword
            }
        })
        .then(res => {
            console.log(res.data)
            if(res.data.status == '404' || res.data.status == '401'){
                this.setState({errMsg: res.data.message})
            }else if(res.data.status == '200'){
                swal('Success!', 'You have been logged in!', 'success')
                this.setState({username: res.data.username, errMsg: ''})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    onBtnRegister = () => {
        let {password, username, repeatPassword} = this.refs
        // this.refs.password
        
        if(!password.value || !username.value || !repeatPassword.value){
            swal('Invalid', 'Please fill all input forms', 'error')
        }else{
            if(password.value === repeatPassword.value){
                Axios.post(URL_API + 'auth/register', {
                    username: username.value,
                    password: password.value
                })
                .then(res => {
                    if(res.data.status == '201'){
                        swal('Registered!', res.data.message, 'success')
                    }else if(res.data.status == '400'){
                        swal('Invalid!', res.data.message, 'error')
                    }
                })
                .catch(err => console.log(err))
            }else{
                swal('Invalid', "Your passwords haven't match", 'error')
            }
        }
    }

    renderLoginPage = () => {
        if(this.state.isLoginPage){
            return (
                <form className="border-0 mb-3 text-center" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                    <h4>LOGIN</h4>
                    <div className="form-group mt-3 row">
                        <div className="col-sm-12">
                            <input type="text" onChange={e => this.setState({inputUsername: e.target.value})} className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                        </div>
                    </div>
                    <div className="form-group row">
                        
                        <div className="col-sm-12">
                            <input type="password" onChange={e => this.setState({inputPassword: e.target.value})} className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                        </div>
                    </div>
                    <div className="btn my-auto"><p>Don't have Account? <Link onClick={() => this.setState({isLoginPage: false})} className="border-bottom">Sign Up!</Link></p></div>
                    <div className="form-group row">
                        <div className="col-12" style={{textAlign:'center'}}>
                            <input type="button" onClick={this.onBtnLogin} value="LOGIN" style={{fontSize:'12px', height:'38px'}} className="btn btn-block login-btn text-white font-weight-bold"/>
                        </div>
                    </div>
                    {
                        this.state.errMsg
                        ?
                        <div className="form-group row">
                            <div className="col-12">
                                <div className="alert alert-danger">{this.state.errMsg}</div>
                            </div>
                        </div>
                        :
                        null
                    }
                </form>
            )
        }else{
            return (
                <form className="border-0 mb-3 text-center" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                        <h4>REGISTER</h4>
                        <fieldset>
                            
                            <div className="form-group mt-3 row">
                                <div className="col-sm-12">
                                    <input type="text" onChange={e => this.setState({inputUsernameRegister: e.target.value})} ref="username" className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input type="password" onChange={e => this.setState({inputPasswordRegister: e.target.value})} ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input type="password" onChange={e => this.setState({inputPasswordRepeat: e.target.value})} ref="repeatPassword" className="form-control" id="inputPassword" placeholder="Repeat Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            <div className="btn my-auto"><p>Already have an account? <Link onClick={() => this.setState({isLoginPage: true})} className="border-bottom">Login</Link></p></div>
                            <div className="form-group row">
                                <div className="col-12" style={{textAlign:'center'}}>
                                    <input type="button" onClick={this.onBtnRegister} value="REGISTER" style={{fontSize:'12px', height:'38px'}} className="btn btn-block login-btn text-white font-weight-bold"/>
                                </div>
                            </div>
                        </fieldset>
                    </form>
            )
        }
    }

    render(){
        return (
            <div className="container" style={{minHeight:"600px"}}>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-5" >
                    {this.renderLoginPage()}
                </div>                
            </div>
        )
    }
}

export default Login