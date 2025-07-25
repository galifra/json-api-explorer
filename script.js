const postList = document.getElementById('postList');
const errorDiv = document.getElementById('error');

async function fetchPosts() {
  postList.innerHTML = '';
  errorDiv.textContent = 'Loading posts...';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const posts = await response.json();

    errorDiv.textContent = ''; // Clear loading/error message

    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.style.borderBottom = '1px solid #ccc';
      postDiv.style.marginBottom = '10px';
      postDiv.style.paddingBottom = '10px';

      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="deleteBtn" data-id="${post.id}">Delete</button>
      `;

      postList.appendChild(postDiv);
    });

    // Attach delete handlers
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const postId = e.target.getAttribute('data-id');

        try {
          const deleteResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE'
          });
          if (!deleteResponse.ok) throw new Error('Failed to delete post');

          // Remove post from UI
          e.target.parentElement.remove();
        } catch (error) {
          errorDiv.textContent = `Delete error: ${error.message}`;
        }
      });
    });

  } catch (error) {
    errorDiv.textContent = `Error: ${error.message}`;
    postList.innerHTML = '';
  }
}
