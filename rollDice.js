const _ = require('lodash')
const co = require('co')

const querystring = require('querystring')

const re = /^([\d]+)[d]{1}([\d]+)(?:(rr\d+)?|(d\d+)?)*$/;
const re2 = /^rr([\d]+)$/

let randomIntInc = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

let rerollDice = function (numbers, match) {
	let reroll = match[3].match(re2)[1]
	let rerolls = _.filter(numbers, (num) => { return num==reroll }).length
	_.pull(numbers, 1)
	for ( let i=0; i < rerolls; i++ ) {
		numbers.push(randomIntInc(1,parseInt(match[2])))
	}
	if ( _.filter(numbers, (num) => { return num==reroll }).length > 0){
		numbers = rerollDice(numbers, match)
	}
	return numbers
}

module.exports = co.wrap(function *(event) {
	
	// console.log('Can you hear me')
	let input = querystring.parse(event.body).text    
	let numbers = null;
	let responseBody = null;

	if (re.test(input)) {
	    let match = input.match(re);

		numbers = new Array(parseInt(match[1]));
		for (var i = 0; i < numbers.length; i++) {
		    numbers[i] = randomIntInc(1,parseInt(match[2]));
		}

		console.log("Numbers before reroll: " + numbers)

		if (re2.test(match[3])) {
			numbers = rerollDice(numbers, match)
		}

		console.log("Final numbers: " + numbers)

		numbers = numbers.join(', ')
	    
	    responseBody = JSON.stringify(
	        {
	            "response_type" : "in_channel",
	            "text": numbers,
	        }
	    );
	} else {
	    responseBody = JSON.stringify(
	        {
	            "response_type" : "ephemeral",
	            "text": "Format is Incorret. Please enter something like 1d100",
	        }
	    );
	}
	response = {
	    "statusCode": 200,
	    "headers": { },
	    "body": responseBody
	};
	context.succeed(response);

})