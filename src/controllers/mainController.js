const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const mainController = {
    index: (req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // console.log(products);// ok
// aca mostramos los objetos literal y filtrar solo caterogy:visited
        const visitedProducts = products.filter(product =>{
            return product.category == "visited"
        })

        const inSaleProducts = products.filter(product =>{
            return product.category == "in-sale"
        })

        return res.render("home", {visitedProducts, inSaleProducts});
    },




    register: (req,res)=>{
        res.render('register')
    },
    login: (req,res)=>{
        res.render('login')
    }
}

module.exports = mainController;