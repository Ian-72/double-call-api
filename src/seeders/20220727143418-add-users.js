const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const dummyData = require('../../dummyData.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    // * insert user dummy data to user table with hashed password
    const tempUsersData = [];
    const salt = bcrypt.genSaltSync(10);
    dummyData.users.forEach((u) => {
      tempUsersData.push({
        user_id: nanoid(16),
        name: u.username,
        password: bcrypt.hashSync(u.password, salt), // use bcrypt to hash password
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('users', tempUsersData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
