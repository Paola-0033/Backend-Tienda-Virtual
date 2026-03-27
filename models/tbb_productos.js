'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    static associate(models) {
      // Relación con tbc_categorias
      tbb_productos.belongsTo(models.tbc_categorias, {
        foreignKey: 'id_categoria',
        as: 'categoria',
      });
    }
  }

  tbb_productos.init({
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT, // Mejor usar TEXT para descripciones largas
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2), // CAMBIO: Debe ser DECIMAL para dinero
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER, // CAMBIO: El stock debe ser un número entero
      defaultValue: 0
    },
    id_categoria: {
      type: DataTypes.INTEGER, // CAMBIO CRÍTICO: Debe ser INTEGER para coincidir con el ID de la categoría
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_productos',
    freezeTableName: true // Evita que Sequelize pluralice el nombre a tbb_productoses
  });

  return tbb_productos;
};
