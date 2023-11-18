const pgp = require('pg-promise')();
const db = pgp({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'UAT_TBP',
});


/// Admins ////
// Define the Admin model as a simple query helper
const Admin = {
  // Create a new admin
  create: (name, password) => {
    return db.one(
      'INSERT INTO admin (name, password) VALUES($1, $2) RETURNING *',
      [name, password]
    );
  },

  //Get adminBy Name for login 
  getByName: (name) => {
    return db.oneOrNone('SELECT * FROM admin WHERE name = $1', name);
  },
  // Get all admins
  getAll: () => {
    return db.any('SELECT * FROM admin');
  },

  // Get an admin by ID
  getById: (id) => {
    return db.oneOrNone('SELECT * FROM admin WHERE id = $1', id);
  },

  // Update an admin by ID
  update: (id, name, password) => {
    return db.oneOrNone(
      'UPDATE admin SET name = $2, password = $3 WHERE id = $1 RETURNING *',
      [id, name, password]
    );
  },

  // Delete an admin by ID
  delete: (id) => {
    return db.result('DELETE FROM admin WHERE id = $1', id, (r) => r.rowCount);
  },
};


// Users ///
const User = {
  // Create a new user
  create: (first_name, last_name, password, email, mobile, city) => {
    return db.one(
      'INSERT INTO "users" (first_name, last_name, password, email, mobile, city) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [first_name, last_name, password, email, mobile, city]
    );
  },

  // Get all users
  getAll: () => {
    return db.any('SELECT * FROM "users"');
  },

  // Get a user by ID
  getById: (id) => {
    return db.oneOrNone('SELECT * FROM "users" WHERE id = $1', id);
  },

  // Update a user by ID
  update: (id, first_name, last_name, password, email, mobile, city) => {
    return db.oneOrNone(
      'UPDATE "users" SET first_name = $2, last_name = $3, password = $4, email = $5, mobile = $6, city = $7 WHERE id = $1 RETURNING *',
      [id, first_name, last_name, password, email, mobile, city]
    );
  },

  // Delete a user by ID
  delete: (id) => {
    return db.result('DELETE FROM "users" WHERE id = $1', id, (r) => r.rowCount);
  },
};

// // Get a user by email
// getByEmail: (email) => {
//   return db.oneOrNone('SELECT * FROM "users" WHERE email = $1', email);
// };



// Business Profiles Models




// Category
// Add a new method to the User model to retrieve a category by name
const Category = {
  // Create a new category
  create: (name, image) => {
    return db.one(
      'INSERT INTO category (name, image) VALUES($1, $2) RETURNING *',
      [name, image]
    );
  },

  // Get all categories
  getAll: () => {
    return db.any('SELECT * FROM category');
  },

  // Get a category by ID
  getById: (id) => {
    return db.oneOrNone('SELECT * FROM category WHERE id = $1', id);
  },

  // Update a category by ID
  update: (id, name, image) => {
    return db.oneOrNone(
      'UPDATE category SET name = $2, image = $3 WHERE id = $1 RETURNING *',
      [id, name, image]
    );
  },

  // Delete a category by ID
  delete: (id) => {
    return db.result('DELETE FROM category WHERE id = $1', id, (r) => r.rowCount);
  },
};


// Sub Category
// Subcategory CRUD operations

const Subcategory = {
  create: async (subcategoryname, subcategoryimage, categoryname) => {
    try {
      const result = await db.one(
        'INSERT INTO subcategory (subcategoryname, subcategoryimage, categoryname) VALUES($1, $2, $3) RETURNING *',
        [subcategoryname, subcategoryimage, categoryname]
      );
      return result;
    } catch (error) {
      console.error('Failed to create subcategory:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const subcategories = await db.any('SELECT * FROM subcategory');
      return subcategories;
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const subcategory = await db.oneOrNone('SELECT * FROM subcategory WHERE id = $1', id);
      return subcategory;
    } catch (error) {
      console.error('Failed to fetch subcategory by ID:', error);
      throw error;
    }
  },

  update: async (id, subcategoryname, subcategoryimage, categoryname) => {
    try {
      const result = await db.oneOrNone(
        'UPDATE subcategory SET subcategoryname = $2, subcategoryimage = $3, categoryname = $4 WHERE id = $1 RETURNING *',
        [id, subcategoryname, subcategoryimage, categoryname]
      );
      return result;
    } catch (error) {
      console.error('Failed to update subcategory:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const result = await db.result('DELETE FROM subcategory WHERE id = $1', id);
      return result.rowCount;
    } catch (error) {
      console.error('Failed to delete subcategory:', error);
      throw error;
    }
  },
};



// requests
const Request = {
  create: (name, email, mobile, address) => {
      return db.one(
          'INSERT INTO requests(name, email, mobile, address) VALUES($1, $2, $3, $4) RETURNING *',
          [name, email, mobile, address]
      );
  },

  getAll: () => {
      return db.any('SELECT * FROM requests');
  },

  getById: (id) => {
      return db.oneOrNone('SELECT * FROM requests WHERE id = $1', id);
  },

  update: (id, status) => {
      return db.result('UPDATE requests SET status = $2 WHERE id = $1', [id, status]);
  },

  delete: (id) => {
      return db.result('DELETE FROM requests WHERE id = $1', id);
  },
};


module.exports = {
  db,
  Admin,
  User,
  Category,
  Subcategory,
  Request
  
};
