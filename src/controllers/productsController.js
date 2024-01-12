const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const productsController = {
    index: (req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // console.log(products);// ok
        res.render("products", {products});
    },
    detail:(req,res)=>{
        // res.send(req.params.id) ok
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        const singleProduct = products.find(product=>{
            return product.id == req.params.id
        })

        res.render("detail", {singleProduct});
    },
    create:(req,res)=>{
        res.render("product-create-form")
    },
    proccesCreate:(req,res)=>{
        // res.send("todo bien") ok
        // console.log(req.file)
        const resultValidation = validationResult(req);
        console.log(resultValidation.errors);




    // console.log(req.file.filename);

    // Guardar el producto con la información del usuario

    // Traer constante de productos
    // Transformarlo en un array
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    
    // Tener la info del formulario
    // Crear el objeto literal (producto) a sumar al array
    if (resultValidation.errors.length > 0) {
        res.render("product-create-form", {
            errorsObjeto: resultValidation.mapped(),
            oldData: req.body
        })
    } else {
        let newProduct = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            // image: req.file.filename
            image: req.file ? req.file.filename : "default-image.jpg"
        }
    
        // Pushear el objeto literal al array
        products.push(newProduct);
    
        // Transformar a json
        // Sobreescribir el archivo JSON
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    
        // Mostrarle al usuario una vista (index)
        res.redirect("/products/detail/" + newProduct.id);
    }

    },

    edit:(req,res)=>{
        // Do the magic
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const productToEdit = products.find(product =>{
            return product.id == req.params.id
        })

        res.render("product-edit-form", {productToEdit});
    },

	processEdit: (req, res) => {
		// Do the magic
       
        //Leemos el archivo json
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        //buscamos el producto que tenemos que editar
        const id = req.params.id;
        let productToEdit = products.find(product => product.id == id);

        // Creamos el producto "nuevo" que va a reemplazar al anterior
        productToEdit = {
            id:productToEdit.id,
            name:req.body.name,
            price:req.body.price,
            discount:req.body.discount,
            category:req.body.category,
            description:req.body.description,
            image:productToEdit.image   
        }
        // Buscamos la posicion del producto a editar
        let indice = products.findIndex(product =>{
            return product.id == id
        })
        // Remplazamos
        products[indice] = productToEdit;
     
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        res.redirect("/")
    },
	destroy: (req, res) => {
		// Do the magic
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// eliminar
		products = products.filter(product => {
			return product.id != req.params.id
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		res.redirect("/");
    }
};

module.exports = productsController;