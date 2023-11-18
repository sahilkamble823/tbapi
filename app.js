const express = require('express');
const bodyParser = require('body-parser');
const { db, Admin, User,BusinessProfile,Category,Subcategory,Request } = require('./db'); // Import the database and Admin model

const app = express();

app.use(bodyParser.json());

// Create a new admin
app.post('/admins', async (req, res) => {
  try {
    const { name, password } = req.body;
    const admin = await Admin.create(name, password);
    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Get all admins
app.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.getAll();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Get an admin by ID
app.get('/admins/:id', async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.getById(adminId);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
});

// Update an admin by ID
app.put('/admins/:id', async (req, res) => {
  const adminId = req.params.id;
  const { name, password } = req.body;
  try {
    const admin = await Admin.update(adminId, name, password);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update admin' });
  }
});

// Delete an admin by ID
app.delete('/admins/:id', async (req, res) => {
  const adminId = req.params.id;
  try {
    const rowCount = await Admin.delete(adminId);
    if (rowCount) {
      res.json({ message: 'Admin deleted' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

// Admin login
app.post('/admin/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Retrieve the admin with the provided name
    const admin = await Admin.getByName(name);

    if (admin && admin.password === password) {
      // Credentials are correct
      // You can generate an authentication token here if needed
      res.status(200).json({ message: 'Admin logged in successfully' });
    } else {
      // Credentials are incorrect
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});



/// Users ///
// Create a new user
app.post('/users', async (req, res) => {
  try {
    const { first_name, last_name, password, email, mobile, city } = req.body;
    const user = await User.create(first_name, last_name, password, email, mobile, city);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.getById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, password, email, mobile, city } = req.body;
  try {
    const user = await User.update(userId, first_name, last_name, password, email, mobile, city);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const rowCount = await User.delete(userId);
    if (rowCount) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// User login
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getByEmail(email);
    if (user && user.password === password) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Login failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});



// Bussiness Profile


// // Create a new category
app.post('/categories', async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await Category.create(name, image);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get a category by ID
app.get('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.getById(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Update a category by ID
app.put('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { name, image } = req.body;
  try {
    const category = await Category.update(categoryId, name, image);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete a category by ID
app.delete('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const rowCount = await Category.delete(categoryId);
    if (rowCount) {
      res.json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// SubCategory
// Create a new subCategory
// Create a new subcategory
app.post('/subcategories', async (req, res) => {
  const { subcategoryname, subcategoryimage, categoryname } = req.body;
  try {
    const subcategory = await Subcategory.create(subcategoryname, subcategoryimage, categoryname);
    res.status(201).json(subcategory);
  } catch (error) {
    console.error('Failed to create subcategory:', error);
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
});

// Get all subcategories
app.get('/subcategories', async (req, res) => {
  try {
    const subcategories = await Subcategory.getAll();
    res.json(subcategories);
  } catch (error) {
    console.error('Failed to fetch subcategories:', error);
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
});

// Get a subcategory by ID
app.get('/subcategories/:id', async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const subcategory = await Subcategory.getById(subcategoryId);
    if (subcategory) {
      res.json(subcategory);
    } else {
      res.status(404).json({ error: 'Subcategory not found' });
    }
  } catch (error) {
    console.error('Failed to fetch subcategory by ID:', error);
    res.status(500).json({ error: 'Failed to fetch subcategory' });
  }
});

// Update a subcategory by ID
app.put('/subcategories/:id', async (req, res) => {
  const subcategoryId = req.params.id;
  const { subcategoryname, subcategoryimage, categoryname } = req.body;
  try {
    const subcategory = await Subcategory.update(subcategoryId, subcategoryname, subcategoryimage, categoryname);
    if (subcategory) {
      res.json(subcategory);
    } else {
      res.status(404).json({ error: 'Subcategory not found' });
    }
  } catch (error) {
    console.error('Failed to update subcategory:', error);
    res.status(500).json({ error: 'Failed to update subcategory' });
  }
});

// Delete a subcategory by ID
app.delete('/subcategories/:id', async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const rowCount = await Subcategory.delete(subcategoryId);
    if (rowCount) {
      res.json({ message: 'Subcategory deleted' });
    } else {
      res.status(404).json({ error: 'Subcategory not found' });
    }
  } catch (error) {
    console.error('Failed to delete subcategory:', error);
    res.status(500).json({ error: 'Failed to delete subcategory' });
  }
});


//request
// Create a new request
app.post('/requests', async (req, res) => {
  const { name, email, mobile, address } = req.body;
  try {
    const result = await Request.create(name, email, mobile, address); // Use Request.create here
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create request' });
  }
});

// Get all requests
app.get('/requests', async (req, res) => {
  try {
    const requests = await Request.getAll(); // Use Request.getAll here
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Get a request by ID
app.get('/requests/:id', async (req, res) => {
  const requestId = req.params.id;
  try {
    const request = await Request.getById(requestId); // Use Request.getById here
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch request' });
  }
});

// Update a request by ID (approve or reject)
app.put('/requests/:id', async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;
  try {
    const result = await Request.update(requestId, status); // Use Request.update here
    if (result.rowCount > 0) {
      res.json({ message: 'Request updated' });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update request' });
  }
});

// Delete a request by ID
app.delete('/requests/:id', async (req, res) => {
  const requestId = req.params.id;
  try {
    const result = await Request.delete(requestId); // Use Request.delete here
    if (result.rowCount > 0) {
      res.json({ message: 'Request deleted' });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete request' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
