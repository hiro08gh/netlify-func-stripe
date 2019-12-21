require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const statusCode = 200;

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode,
      headers,
      body: 'POSTリクエストではありません！',
    };
  }

  const data = JSON.parse(event.body);

  if (event.httpMethod === 'POST') {
    stripe.charges
      .create({
        amount: parseInt(data.amount),
        currency: 'jpy',
        description: 'An example charge',
        source: data.body,
      })
      .then(({status}) => {
        return {
          statusCode,
          headers,
          body: event.body,
        };
      })
      .catch(err => {
        console.log(err);
      });
  }
};
