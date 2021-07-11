const stripe = require('stripe')('sk_test_51J3WxqBbP3JGRmwnlOm3W0XvrqBx1aknUKvFAY4ivYo4Scbu2PjQofwWTSWyOqjbTg0RTuXe2kwnfY125CA8yYzH00u1HBcs7I');
const express = require('express');
const app = express();
app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {

    let products = req.body.products;
    console.log(req.body.products)

    let arrayProducts = [];

    products.forEach(element => {
        let lineProduct = {
            price_data: {
              currency: 'mxn',
              product_data: {
                name: element.name,
                images: ['https://i.imgur.com/EHyR2nP.png'],
              },
              unit_amount: element.price,
            },
            quantity: element.quantity,
          }
          arrayProducts.push(lineProduct)
    });

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: arrayProducts,
      mode: 'payment',
      success_url: `${DOMAIN}/pago_satisfactorio`,
      cancel_url: `${DOMAIN}/pago_fallido`,
    });
    res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));