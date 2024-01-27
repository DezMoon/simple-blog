const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 3000;
const secretKey = 'secret-key';  

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString()} - ${req.method} ${req.path}`);
  next();
});

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

// REST API - CRUD
let posts = [];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.post('/api/posts', (req, res) => {
  const newPost = req.body;
  newPost.id = generateId();
  posts.push(newPost);
  res.json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  const index = posts.findIndex(p => p.id === postId);

  if (index !== -1) {
    posts[index] = updatedPost;
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  posts = posts.filter(p => p.id !== postId);
  res.json({ message: 'Post deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper function to generate a unique ID
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
