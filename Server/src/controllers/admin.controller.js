

const DB = require('../../database/models')

const adminController = {
	// Dashboard usuario Listar los productos 
	adminController: (req, res) => {
		const title = "Management";
		DB.Product.findAll().then((product) => {
			res.render('./admin/dashboard', { product })
		})
	}

}
module.exports = adminController;
