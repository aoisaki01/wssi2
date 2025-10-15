'use strict';

const { down } = require("./20251008142311-create-table-users");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refresh_tokens',{
      id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },
      token : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      user_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
      },
      created_at : {
        type : "TIMESTAMP",
        defaultValue : Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull : false
      },
      updated_at : {
        type : "TIMESTAMP",
        defaultValue : Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull : true
      },
      
      
    } );
    await queryInterface.addConstraint('refresh_tokens',{
      type : 'foreign key',
      fields : ['user_id'],
      name : 'FK_REFRESH_TOKENS_USER_ID',
      references : {
        table : 'users',
        field : 'id'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('refresh_tokens');
  }
}