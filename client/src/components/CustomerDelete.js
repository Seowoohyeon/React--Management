import React from "react";
import '../App.css';
import PropTypes from 'prop-types'

class CustomerDelete extends React.Component{

    deleteCustomer = (id) => {
        const url = '/api/customers/' + id
        fetch(url, {
            method: 'delete'
        })
        this.props.stateRefresh()
    }

    render() {
        return(
            <button className="btn" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }

}

export default CustomerDelete