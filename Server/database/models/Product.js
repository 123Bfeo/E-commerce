module.exports = function (sequelize, dataTypes) {
	const alias = "Product";
	const cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: dataTypes.STRING,
		},
		description: {
			type: dataTypes.STRING,
		},
		price: {
			type: dataTypes.INTEGER,
			defaultValue: 0
		},
		image: {
			type: dataTypes.STRING,
		},
		category: {
			type: dataTypes.STRING,
		},
		discount: {
			type: dataTypes.INTEGER
		}
	}

	const config = {
		tableName: "products",
		timestamps: false,
	};

	const Product = sequelize.define(alias, cols, config);
	Product.associate = function (models) {
		Product.belongsTo(models.Brand, {
			as: "productBrands",
			foreignKey: "brands_id",
		});
		Product.hasMany(models.Opinion, {
			as: "productOpinions",
			foreignKey: "products_id2",
		})
		Product.belongsToMany(models.ShoppingCart, {
			as: "productShoppingCart",
			through: "products_shoppingcart",
			foreignKey: "products_id",
			otherKey: "shoppingcart_id",
			timestamps: false,
		});
	}
	return Product;
}
