let posts = [];

// Toggle Create Post Form
function toggleCreatePostForm() {
    const form = document.getElementById("create-post-form");
    form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
}

// Create a new post
function createPost() {
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    const tags = document.getElementById("post-tags").value.split(',');

    if (title && content) {
        const newPost = {
            title,
            content,
            tags,
            comments: []
        };

        posts.push(newPost);
        renderPosts();
        toggleCreatePostForm();
    } else {
        alert("Please fill in all fields.");
    }
}

// Render all posts
function renderPosts() {
    const blogPostsContainer = document.getElementById("blog-posts");
    blogPostsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        const title = document.createElement('h2');
        title.textContent = post.title;

        const content = document.createElement('p');
        content.textContent = post.content;

        const tags = document.createElement('div');
        tags.classList.add('tags');
        tags.textContent = `Tags: ${post.tags.join(', ')}`;

        const commentButton = document.createElement('button');
        commentButton.classList.add('comment-btn');
        commentButton.textContent = "Add Comment";
        commentButton.onclick = () => handleComment(index);

        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments');

        post.comments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentsSection.appendChild(commentElement);
        });

        postElement.appendChild(title);
        postElement.appendChild(content);
        postElement.appendChild(tags);
        postElement.appendChild(commentButton);
        postElement.appendChild(commentsSection);

        blogPostsContainer.appendChild(postElement);
    });
}

// Handle Adding a Comment
function handleComment(postIndex) {
    const comment = prompt("Enter your comment:");
    if (comment) {
        posts[postIndex].comments.push(comment);
        renderPosts(); // Re-render posts to show new comment
    }
}
