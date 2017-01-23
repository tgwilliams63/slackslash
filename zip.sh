#!/bin/bash

if [ -f ./zip.sh ]
then
	rm -rf ./zip.sh
fi

node install
zip -r diceRoll.zip *
aws lambda update-function-code --function-name rollDice --zip-file fileb://diceRoll.zip