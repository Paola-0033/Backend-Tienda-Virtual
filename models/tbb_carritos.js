'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_carritos.init({
    id_usuario: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    total: {
      type: DataTypes.STRING(10,2),
      allowNull: false,
      defaultValue: '0.00'
      
    },

    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tbb_carritos',
  });
  return tbb_carritos;
};