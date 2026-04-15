'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbd_carrito_detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbd_carrito_detalle.init({
    id_carrito: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbd_carrito_detalle',
    tableName: 'tbd_carrito_detalle',
  });

  tbd_carrito_detalle.associate = function (models) {
    // Relación con tbb_carrito
    tbd_carrito_detalle.belongsTo(models.tbb_carrito,
      {
        as: 'tbb_carrito',
        foreignKey: 'id_carrito',
      }
    );

    // Relación con tbb_producto
    tbd_carrito_detalle.belongsTo(models.tbb_producto,
      {
        as: 'tbb_producto',
        foreignKey: 'id_producto',
      }
    );
  };

  return tbd_carrito_detalle;
};
