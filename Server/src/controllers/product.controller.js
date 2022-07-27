const db = require('../../database/models');


const productController = {
  products: (req, res) => {
    db.Product.findAll()
      .then(function (product) {
        res.render('./Pages/Products/Products', { product })
      })
  },

  // cartProduct: (req, res) => {
  //   res.render('./products/productCart')
  // },

  // Crear productos y guardarlos 
  createProduct: (req, res) => {
    res.render('./admin/adminCreate')
  },
  saveProduct: (req, res) => {

    db.Product.create(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        image: req.file.filename,
        category: req.body.category
      });

    res.redirect("/admin");
  },

  //detalle del producto
  detailProduct: (req, res) => {
    const title = 'Detalle de producto';
    const reqCategory = db.Category.findAll();
    const reqProduct = db.Product.findByPk(req.params.id);
    Promise.all([reqCategory, reqProduct],
      { include: [{ association: "productCategory" }] })
      .then(([category, product]) => {
        //res.rende('./products/productDet', { title, product, category })
        res.render('./products/productDet', { title, product, category });
      });

  },
  // Editar y actualizar producto
  editProduct: (req, res) => {
    db.Product.findByPk(
      req.params.id
    ).then((product) => {
      res.render("./products/editProduct", { product })
    })
  },
  updateProduct: (req, res) => {
    db.Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        discount: req.body.discount,
        category: req.body.category,
        image: req.file.filename
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/admin");
  },

  // Eliminar Producto
  deleteProduct: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/admin");
  },
};

module.exports = productController;
