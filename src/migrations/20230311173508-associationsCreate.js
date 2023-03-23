'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn('Questions', 'QuizId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Quizzes'
        },
        key: 'id'
      },
      allowNull: true
    });
    queryInterface.addColumn('Choices', 'QuestionId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Questions'
        },
        key: 'id'
      },
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('Questions', 'QuizId');
    queryInterface.removeColumn('Choices', 'QuestionId');
  }
};
