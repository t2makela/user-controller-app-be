const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

// Define User model
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  website: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes for user model

// Get all users
app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Add user
app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
  });

// Modify user
app.put('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  
// Delete user  
  app.delete('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});