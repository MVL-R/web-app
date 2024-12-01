const db = require('./database');

exports.getAllPosts = (req, res) => {
  db.all(`
    SELECT posts.*, users.username,
           (SELECT COUNT(*) FROM upvotes WHERE upvotes.post_id = posts.id) as upvotes
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY date_created DESC
  `, [], (err, posts) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(posts);
  });
};

exports.addPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.session.user.id;

  db.run('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Post added successfully' });
  });
};

exports.upvotePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.session.user.id;

  db.run('INSERT INTO upvotes (user_id, post_id) VALUES (?, ?)', [userId, postId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Upvote added' });
  });
};
