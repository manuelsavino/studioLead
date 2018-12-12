import React, { Component, Fragment } from 'react'
import NavBar from '../components/Navbar';
import API from "../utils/API";


export default class LeadView extends Component {
    constructor()
    {
        super()
        this.state= {
            result: ''
        }
    }

    componentWillMount = () => {
        const { id } = this.props.match.params
        API.getOneLead(id).then(result => {this.setState({result: result.data[0]})})

    }

    render(){
        
        const values = this.state.result
        console.log(typeof values);
        if(this.state.result != ''){
        return (
        <Fragment>
            <NavBar />
            <div className="container">
            <ul>
              <li>{`${values.cFirstName} ${values.cLastName}`}</li>
              <li>{`${values.pFirstName} ${values.pLastName}`}</li>
            </ul>
            </div>
          </Fragment>
        )
        }else{
            return (
                <Fragment>
                    <NavBar />
                    <div className="container text-center">
                        <img className="my-auto" src="/loading.gif" alt="Loading" />
                    </div>
                </Fragment>
            )
        }
    }
}