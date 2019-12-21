require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      headers,
      body: 'Not POST Request',
    };
  }

  const data = JSON.parse(event.body);

  if (event.httpMethod === 'POST') {
    try {
      await stripe.charges.create({
        amount: parseInt(data.amount),
        currency: 'jpy',
        description: 'An example charge',
        source: data.body,
      });
      return {
        statusCode: 200,
        headers,
        body: event.body,
      };
    } catch (err) {
      console.log(err);
    }
  }
};
