const formEl = document.getElementsByTagName('form')[0];
const id = formEl.id;
console.log("ID:" + id);

const updateBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#blog-post-title").value.trim();
    const content = document.querySelector("#blog-post-content").value.trim();

    if (title && content) {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT', 
            body: JSON.stringify({ title, content }), 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Sorry, there was an error in updating your blog post.');
        }
    }
};

const deleteBlogHandler = async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Sorry, there was an error in deleting a project');
        }
    }
};

document
    .querySelector('.modify-blog-form')
    .addEventListener('submit', updateBlogHandler);

document
    .querySelector('.delete-btn')
    .addEventListener('click', deleteBlogHandler);
