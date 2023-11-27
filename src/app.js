const express = require("express");
const path = require("path")

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// app.listen(3047,()=>{
//     console.log("http://localhost:3047/")
// });

const port = process.env.PORT || 3047;
app.listen(port,()=>console.log(`Servidor Corriendo en el puerto ${port}`));


app.get ("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, './views/home.html'))
})

app.use(express.static('public'))

// Definimos las rutas
app.get ("/home", (req, res)=>{
    res.sendFile(path.join(__dirname, './views/home.html'))
})

app.get ("/register", (req, res)=>{
    res.sendFile(path.join(__dirname, './views/register.html'))
})

app.get ("/login", (req, res)=>{
    res.sendFile(path.join(__dirname, './views/login.html'))
})