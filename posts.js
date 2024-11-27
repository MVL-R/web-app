document.addEventListener('DOMContentLoaded', fetchPosts);

async function fetchPosts() {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  renderPosts(posts);
}

function renderPosts(posts) {
  const container = document.getElementById('posts-section');
  container.innerHTML = posts.map(post => `
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-lg font-bold">${post.title}</h2>
      <p>${post.content}</p>
      <small>Posted by ${post.username}</small>
      <div>
        <span>${post.upvotes || 0} upvotes</span>
        <button onclick="upvote(${post.id})" class="ml-2">⬆ Upvote</button>
      </div>
    </div>
  `).join('');
}

async function upvote(postId) {
  await fetch(`/api/posts/${postId}/upvote`, { method: 'POST' });
  fetchPosts();
}
