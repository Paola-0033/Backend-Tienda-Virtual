'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_productos.init({
    nombre:{
        type: DataTypes.STRING(150),
        allowNull: false
    } ,
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    precio: {
        type: DataTypes.STRING(10,2),
        allowNull: false
    },
    stock: {
        type: DataTypes.STRING,
        defaultValue: 0
    },
    id_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_productos',
  });

  tbb_productos.associate = function(models) {
    // Relación con tbc_usuario
    tbb_productos.belongsTo(models.tbc_categoria,
       {
      foreignKey: 'id_categoria',
      as: 'tbc_categorias',
    });
  return tbb_productos;
};
}
