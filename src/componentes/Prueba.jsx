import React, { Component } from 'react'
import env from 'react-dotenv';
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(env.PUBLIC_KEY);


export default class Prueba extends Component {
    _handlePagar = async () =>{

        const products = [
            {
                name:"producto 1",
                quantity: 2,
                price: 4000
            },
            {
                name:"producto 2",
                quantity: 7,
                price: 2000
            },
            {
                name:"producto 3",
                quantity: 1,
                price: 6000
            }
        ];

        const productsObject = {
            products: products
        }
        const stripe = await stripePromise;

		const response = await fetch(`${env.URL_SERVER}/create-checkout-session`, {
            body: JSON.stringify(productsObject),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const session = await response.json();

        const result = await stripe.redirectToCheckout({
        sessionId: session.id,
        });
    }
    render() {
        return (
            <div>
                <h1>Comprar todo lo que tengo en el carrito</h1>
                <button role="link" onClick={this._handlePagar}>Pagar</button>
            </div>
        )
    }
}
