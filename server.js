const express = require('express');
const db = require('./db');
const blogManager = require('./blog-management');
const courseManager = require('./course-management');
const paymentProcessor = require('./payment-flow');

const app = express();
app.use(express.json());

// Blog routes
app.post('/api/admin/blog', async (req, res) => {
    const { title, content, publishDate } = req.body;
    const authorId = 1; // Static or dynamic author ID, adjust as needed
    const result = await blogManager.createBlogPost(title, content, authorId, publishDate);
    res.json(result);
});

// Periodic job for publishing scheduled blog posts
setInterval(async () => {
    await blogManager.publishScheduledPosts();
}, 60000); // Runs every 60 seconds

// Course routes
app.get('/api/courses', async (req, res) => {
    const courses = await courseManager.getAllCourses();
    res.json(courses);
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
