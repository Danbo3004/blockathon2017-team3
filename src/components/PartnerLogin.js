import React, { Component } from 'react'

export default class PartnerLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id          : '',
            password    : '',
        }
    }

    render() {
        return (
            <div className='partner-login'>
                <div className='form'>
                    <div className='title'><h1><span>P</span>to<span>G</span>ether for Partner</h1></div>
                    <div className='form-group'>
                        <label>ID</label>
                        <input type='text' value={this.state.id} onChange={e => this.setState({ id: e.currentTarget.value })} />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' value={this.state.password} onChange={e => this.setState({ password: e.currentTarget.value })} />
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
        const { id, password } = this.state
        if (id == 'host' && password == '123') {
            this.props.history.push('/host')
        }
    }
}