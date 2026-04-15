'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_carrito.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'pagado', 'cancelado'),
      defaultValue: 'pendiente',
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_carrito',
    tableName: 'tbb_carritos',
  });

  tbb_carrito.associate = function (models) {
    // Relación con tbc_usuario
    tbb_carrito.belongsTo(models.tbc_usuario,
      {
        as: 'tbc_usuario',
        foreignKey: 'id_usuario',
      }
    );
  };

  return tbb_carrito;
};
