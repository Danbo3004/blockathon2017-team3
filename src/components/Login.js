import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div className='login'>
                <div className='form'>
                    <div className='title'><h1><span>P</span>to<span>G</span>ether</h1></div>
                    <div className='form-group'>
                        <label>ID</label>
                        <input type='text'/>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password'/>
                    </div>
                    <div className='form-group'>
                        <label></label>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}