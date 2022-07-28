const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { users } = require('./src/models/index');
require('dotenv').config();

// load dummy data
const dummyData = require('./dummyData.json');

// eslint-disable-next-line consistent-return
const virifyCred = async (username, passwd) => {
  try {
    // find user data in database
    const cred = await users.findAll({
      attributes: ['user_id', 'password'],
      where: {
        name: username,
      },
      raw: true,
    });

    // if index of cred = 0 it will return 0
    if (cred.length === 0) {
      return 0;
    }

    // compare paswword with hashed password with bcrypt
    const hashedPasswd = cred[0].password;
    const match = bcrypt.compareSync(passwd, hashedPasswd);

    // if not match return -1
    if (!match) {
      return -1;
    }

    return cred[0].user_id; // returning user id
  } catch (error) {
    console.log(error.message);
  }
};

(async () => {
  const random = Math.floor(Math.random() * dummyData.users.length); // to get random number

  // get username and password from env file or select random data from dummy data
  const username = process.env.TEST_USERNAME || dummyData.users[random].username;
  const password = process.env.TEST_USERPASSWD || dummyData.users[random].password;

  const userId = await virifyCred(username, password); // verify user cred

  // if user not found
  if (userId === 0) {
    console.log('user not found!');
    return;
  }

  // if user type wrong password
  if (userId === -1) {
    console.log('wrong password!');
    return;
  }

  const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_KEY); // get JWT token
  console.log(`Access Token : ${accessToken}`);
})();
