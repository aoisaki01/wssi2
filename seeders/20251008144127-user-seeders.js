'use strict';
const bcrypt = require('bcryptjs');
const { up } = require('../migrations/20251008142311-create-table-users');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('users', [
    {
      name : 'Suyud',
      proffession : 'Administrator',
      role : 'admin',
      email : 'ohmyud@gmail.com',
      pass : await bcrypt.hash('rahasia1234',10),
      created_at : new Date(),
    },
     {
      name : 'Widiono',
      proffession : 'Operator',
      role : 'Operator',
      email : 'Widiono@gmail.com',
      pass : await bcrypt.hash('rahasia1234',10),
      created_at : new Date(),
    },
    
   ]);
 },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
}
