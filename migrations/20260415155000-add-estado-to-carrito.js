'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tbb_carritos', 'estado', {
      type: Sequelize.ENUM('pendiente', 'pagado', 'cancelado'),
      defaultValue: 'pendiente',
      allowNull: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tbb_carritos', 'estado');
  }
};
