// use express framework,
const express = require('express')
const app = express()
// serve static html/css/js files, image, etc..
// good old web site files
// in folder public_html
app.use(express.static('public_html'))
app.use(express.urlencoded())
app.use(express.json())

const cors = require('cors')
app.use(cors())

// HOME PAGE http://localhost:8000
app.get('/',
    async (req, res) => {
        res.writeHead(200)
        res.end('<h1>Welcome offices microservice API</h1>')
    }
)



app.get('/test-param/:a', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end('<h1>' + request.params.a + '</h1>')
})
app.get('/test-param/:a/:b', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end('<h1>a=' + request.params.a + ' b=' + request.params.b + '</h1>')
})

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html

app.set('view engine', 'ejs')


// List all customers
app.get('/customers_list', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from customers', function (customers) {
        let html = ''
        html += 'Number of customers: ' + customers.rowCount + '<br>'
        html += '<table>'
        for (let i = 0; i < customers.rowCount; i++) {
            html += '<tr><td>' + customers.rows[i].customernumber + '</td><td>' + customers.rows[i].customername + '</td></tr>'
        }
        html += '</table>'

        // use the page template of course to display the list
        const pageData = {} // initialize empty object
        pageData.title = 'Customers List-blabla.com'
        pageData.description = 'Customers Number and Name'
        pageData.author = 'The blabla.com team'
        // send out the html table
        pageData.content = html
        response.render('master_template', pageData)
        DB.disconnect()
    })
})

app.get('/offices/:id', (req, res) => {

    const id = req.params.id

    const DB = require('./src/dao')

    DB.connect()

    DB.queryParams('SELECT * from offices WHERE officecode=$1', [id],

        function (offices) {

            if (offices.rowCount === 1) {

                const officesJSON = { msg: 'OK', offices: offices.rows[0] }

                const officesJSONString = JSON.stringify(officesJSON, null, 4)

                // set content type

                res.writeHead(200, { 'Content-Type': 'application/json' })

                // send out a string

                res.end(officesJSONString)

            } else {

                // set content type

                const officesJSON = { msg: 'Office not found' }

                const officesJSONString = JSON.stringify(officesJSON, null, 4)

                res.writeHead(404, { 'Content-Type': 'application/json' })

                // send out a string

                res.end(officesJSONString)

            }


            DB.disconnect()

        }

    )

})

app.get('/products', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Product Catalog-blabla.com'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'The blabla.com team'
    const products = [
        { id: 1, name: 'white shoes', price: '99.99' },
        { id: 2, name: 'black shoes', price: '69.99' },
        { id: 3, name: 'blue shoes', price: '79.99' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '<td>' + products[i].price + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})


// for AJAX tests, returns the list of customers in a JSON string
app.get('/customers', function (request, response) {
    let DB = require('./src/dao');
    DB.connect();
    DB.query('SELECT * from customers',function (customers){
        const customersJSON={customers:customers.rows}
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json'})
       // send out a string
        response.end(customersJSONString)
    })
});

// delete one customer
// note you cannot delete customers with orders
// to know customers that don't have an order run this query
// SELECT * from customers
// LEFT JOIN orders on customers.customernumber = orders.customernumber
// WHERE ordernumber IS NULL
// ORDER BY customers.customernumber ASC
// result: you can delete customernumber 477,480,481 and others
app.delete('/customers/:id', function (request, response) {
    let id=request.params.id // read the :id value send in the URL
    let DB = require('./src/dao');
    DB.connect();
    DB.queryParams('DELETE from customers WHERE customernumber=$1',[id],function (customers){
        response.writeHead(200, { 'Content-Type': 'text/html'})
       // send out a string
        response.end("OK customer deleted")
    })
});


app.get('/employees', function (request, response) {
    let DB = require('./src/dao');
    DB.connect();
    DB.query('SELECT * from employees',function (employees){
        const employeesJSON={employees:employees.rows}
        const employeesJSONString = JSON.stringify(employeesJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json'})
       // send out a string
        response.end(employeesJSONString)
    })
});

app.get('/offices', function (request, response) {
    let DB = require('./src/dao');
    DB.connect();
    DB.query('SELECT * from offices',function (offices){
        const officesJSON={offices:offices.rows}
        const officesJSONString = JSON.stringify(officesJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json'})
       // send out a string
        response.end(officesJSONString)
    })
});

app.delete('/offices/:id', function (request, response) {
    let id=request.params.id // read the :id value send in the URL
    let DB = require('./src/dao');
    DB.connect();
    DB.queryParams('DELETE from offices WHERE officecode=$1',[id],function (offices){
        response.writeHead(200, { 'Content-Type': 'text/html'})
       // send out a string
        response.end("OK office deleted")
    })
});

// LAST LINE OF CODE- START SERVER - ON PORT 8000
app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000')
})