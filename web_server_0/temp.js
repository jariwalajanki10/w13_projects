constfs = require('fs')

functionlogMsg (message) {

if (!fs.existsSync('log')) {

fs.mkdirSync('log')

// eslint-disable-next-line no-irregular-whitespace

console.log('Directory created: ', 'log')

 }

// eslint-disable-next-line no-undef

fs.appendFile('./log/server_log.log', message + '\n',

function (err) {

if (err) throwerr

else {

console.log('ok')

 }

 })

}

logMsg('test message')