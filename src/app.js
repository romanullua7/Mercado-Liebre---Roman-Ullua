// Require's
const express = require('express');
const path = require('path')
const methodOverride = require('method-override');// Para poder usar los métodos PUT y DELETE
const welcomeMiddleware = require("./middlewares/global/welcomeMiddleware");
// const session = require("express-session")

// express()
const app = express();


// Middlewares
app.use(express.static('public'));// Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Para tomar los datos del body
app.use(express.json()); // Para tomar los datos del body
app.use(methodOverride('_method'));// Para poder usar los métodos PUT y DELETE

app.use(welcomeMiddleware);

// app.use(session({secret:"mensaje secreto"}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

const mainController = require('./routes/main.js')
const productsController = require('./routes/products.js')



app.use('/', mainController);
app.use('/products', productsController);

app.listen(3044, ()=>{
    console.log('Servidor corriendo en http://localhost:3044')
})