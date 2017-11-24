import React, { Component } from 'react';

export default class Host extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasImage    : false,

            name        : '',
            description : '',
            address     : '',
            price       : 0,
            deposit     : 0,
        }
    }

    render() {
        return (
            <div className='host'>
                <div className='form'>
                    <div className='left-side'>
                        {!this.state.hasImage && <input type="file" id="files" onChange={e => this._uploadImageHandler(e)}/>}
                        <img id="image" />
                    </div>
                    <div className='right-side'>

                        <div className='form-group'>
                            <label>Name</label>
                            <input type='text' value={this.state.name} onChange={e => this.setState({name: e.currentTarget.value})}/>
                        </div>

                        <div className='form-group'>
                            <label>Description</label>
                            <textarea rows='3' value={this.state.description} onChange={e => this.setState({description: e.currentTarget.value})}/>
                        </div>

                        <div className='form-group'>
                            <label>Address</label>
                            <input type='text' value={this.state.address} onChange={e => this.setState({ address: e.currentTarget.value })} />
                        </div>

                        <div className='form-group'>
                            <label>Price</label>
                            <input type='text' value={this.state.price} onChange={e => this.setState({ price: e.currentTarget.value, deposit: e.currentTarget.value * 0.5 })} />
                        </div>

                        <div className='form-group'>
                            <label>Deposit</label>
                            <input type='text' value={this.state.deposit} disabled/>
                        </div>

                        <div className='form-group'>
                            <label></label>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _uploadImageHandler = (e) => {
        var reader = new FileReader();
        if(e.currentTarget.files[0]) {
            this.setState({hasImage: true})
        }

        reader.onload = (e) => {
            document.getElementById("image").src = e.target.result;
        };

        reader.readAsDataURL(e.currentTarget.files[0]);
    }
}