#!/bin/bash

zip -r diceRoll.zip *
aws lambda update-function-code --function-name rollDice --zip-file fileb://diceRoll.zip