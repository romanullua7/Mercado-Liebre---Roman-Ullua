// Require's
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const {body} = require("express-validator");

const authMiddleware = require("../middlewares/routes/authMiddleware")

//Require Controlador
const productsController = require('../controllers/productsController')

// Multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/products");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + "image" + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

// express validator
const createProductValidations = [
    body("name")
    .notEmpty().withMessage("debe completar el campo de nombre del producto"),
    body("price")
    .notEmpty().withMessage("debe completar el campo de nombre de precio"),
    body("description")
    .notEmpty().withMessage("debe completar el campo de nombre de descripcion"),
    body("category")
    .notEmpty().withMessage("debe completar el campo de nombre categoria"),
    body("discount")
    .notEmpty().withMessage("debe completar el campo de descuento").bail()
    .isNumeric().withMessage("debe ingresar un valor numerico"),
    body("productImage")
    .custom((value, {req}) => {

        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif"];
        
        if (!file) {
            throw new Error("Debe subir una imagen")
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error("Las extensiones permitidas son .jpg, .png, .gif")
            }
        }

        return true;
    })
]





//devolver todos los productos (logo)
router.get('/', productsController.index)

//devolver un producto
router.get('/detail/:id/', productsController.detail)

//crear un producto
router.get('/create', authMiddleware, productsController.create)
router.post('/create', upload.single("productImage"),createProductValidations, productsController.proccesCreate)

//Modificar Producto
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.processEdit);

// Eliminar Producto
router.delete('/delete/:id',productsController.destroy)


module.exports = router;