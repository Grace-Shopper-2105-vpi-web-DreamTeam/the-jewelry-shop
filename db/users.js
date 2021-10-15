const {client} = require('./index');

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
//tookout on conflict  ON CONFLICT ("emailAddress") DO NOTHING
const createUser = async ({ username, emailAddress, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user]
    } = await client.query(
      `
      INSERT INTO users(username, "emailAddress", password)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
      [username, emailAddress, hashedPassword]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      return
    }
  } catch (error) {
    throw error
  }
};

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
            SELECT id, username
            FROM users
            WHERE id = ${userId}
      `);

    if (!user) {
      return null
    }

    return user;
  } catch (error) {
    throw error;
  }
}

//do we want this to be select all so user can see their profile.
async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
            SELECT id, username
            FROM users
            WHERE username = $1;
        `, [username]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmailAddress(emailAddress) {
  try {
    const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE emailAddress = $1;
        `, [emailAddress]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
          SELECT id, username, emailAddress
          FROM users
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    await client.query(`
          DELETE FROM cart
          WHERE "userId"=$1;
      `, [id]);

    await client.query(`
      DELETE FROM orders
      WHERE "userId"=$1;
  `, [id]);

    const { rows: [user] } = await client.query(`
          DELETE FROM users
          WHERE id = $1
          RETURNING *
    `, [id]);

    return user;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getUserByEmailAddress,
  getAllUsers,
  deleteUser
}