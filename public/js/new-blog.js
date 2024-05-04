const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-post-title').value.trim();
    const content = document.querySelector('#blog-post-content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST', 
            body: JSON.stringify({ title, content }), 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Sorry, there was an error in creating your new blog post.');
        }
    }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newBlogHandler);

