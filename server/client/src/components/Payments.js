import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout"



export default class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
                amount={}
            />
        )
    }
}
