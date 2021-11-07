const { client } = require('./index');

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({ username, emailAddress, password, isAdmin }) => {

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    if(isAdmin === null || isAdmin === undefined){
      isAdmin = false;
    }
    const {
      rows: [user]
    } = await client.query(
      `
      INSERT INTO users(username, "emailAddress", password, "isAdmin")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
      [username, emailAddress, hashedPassword, isAdmin]
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

            SELECT id, username, "emailAddress", "isAdmin"
            FROM users
            WHERE id = $1
      `, [userId]);

    if (!user) {
      return null
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUserById( id, fields = {} ) {
      const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');

      if (setString.length === 0) {
        return;
      }
      try {
        const { rows: [ user ]} = await client.query(`
          UPDATE users
          SET ${ setString }
          WHERE id=${id}
          RETURNING *;
        `, Object.values(fields));
        return user;
      } catch (error) {
        throw error;
      }
    }

async function updateUserToAdminById(userId) {

  try {
    const { rows: [user] } = await client.query(`
            UPDATE users 
            SET "isAdmin" = $1
            WHERE id = $2
            RETURNING *;
      `, [true, userId]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
            SELECT id, username, password, "emailAddress", "isAdmin"
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
            SELECT id, "emailAddress", username, password
            FROM users
            WHERE "emailAddress" = $1
        `, [emailAddress]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
          SELECT id, username, "emailAddress", "isAdmin"
          FROM users
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
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
  deleteUser,
  updateUserToAdminById,
  updateUserById
}