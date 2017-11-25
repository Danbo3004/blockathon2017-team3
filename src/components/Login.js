import React, { Component } from 'react'
import request from '../utils/request'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id          : '',
            password    : '',
            users       : [],
        }
    }

    componentWillMount() {
        const apiBase = 'http://localhost:5000/api/v1'
        request(`${apiBase}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((users) => {
            this.setState({users})
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className='login'>
                <div className='form'>
                    <div className='title'><h1><span>P</span>to<span>G</span>ether</h1></div>
                    <div className='form-group'>
                        <label>ID</label>
                        <input type='text' value={this.state.id} onChange={e => this.setState({ id: e.currentTarget.value })}/>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' value={this.state.password} onChange={e => this.setState({ password: e.currentTarget.value })}/>
                    </div>
                    <div className='form-group'>
                        <label></label>
                        <button onClick={this._submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }

    _submitHandler = () => {
        const { id, password, users } = this.state
        if(password != 123) alert('wrong password')
        const owner = users.find(user => user.email == id)
        localStorage.setItem('owner', owner._id)
        this.props.history.push('/traveller')
    }
}