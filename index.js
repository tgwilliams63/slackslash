'use strict';
// import Alpr from 'alpr';
var Alpr = require('alpr').default
console.log(Alpr)
var rollDice = require('./rollDice')
// import rollDice from 'rollDice';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    // console.log("This is: " + querystring.parse(event.body).text)
    // console.log('Received event:', JSON.stringify(event.body.text, null, 2));
    const alpr = new Alpr({ event, context, callback });
    // console.log(event)
    // console.log(alpr)

    alpr.route({
        method:'POST',
        path: '/rollDice/',
        handler: rollDice(event)
    })

    if (!alpr.routeMatched) {
        // request resource did not match a route
        callback({
          statusCode: 404,
          headers: {},
          body: { message: "Route not found" }
        });
    }

};
