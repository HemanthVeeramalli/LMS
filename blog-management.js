const db = require('./db');

async function createBlogPost(title, content, authorId, publishDate) {
    const [result] = await db.query(
        'INSERT INTO blog_posts (title, content, author_id, publish_date, status) VALUES (?, ?, ?, ?, ?)',
        [title, content, authorId, publishDate, 'scheduled']
    );
    return { id: result.insertId };
}

async function publishScheduledPosts() {
    const [posts] = await db.query(
        'UPDATE blog_posts SET status = "published" WHERE publish_date <= NOW() AND status = "scheduled"'
    );
    return posts;
}

module.exports = {
    createBlogPost,
    publishScheduledPosts
};
