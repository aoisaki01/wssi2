'use strict';

const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        profession: 'System Administrator', 
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Operator',
        profession: 'Customer Service', 
        avatar: 'https://i.pravatar.cc/150?img=2',
        role: 'operator',
        email: 'operator@example.com',
        password: await bcrypt.hash('operator123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Angga',
        profession: 'Staff IT', 
        avatar: 'https://i.pravatar.cc/150?img=2',
        role: 'operator',
        email: 'staff@example.com',
        password: await bcrypt.hash('staff123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
