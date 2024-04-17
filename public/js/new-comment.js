const newCommentHandler = async (event) => {
    event.preventDefault();

    const formEl = document.getElementsByTagName('form')[0];
    const blog_id = formEl.id;
    const content = document.getElementById('comment-input').value.trim();   

    if (content) {
        const response = await fetch(`/api/comments`, {
            method: 'POST', 
            body: JSON.stringify({ content, blog_id }), 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/blog/${blog_id}`);
        }
    }
};

document.querySelector('.new-comment-form')
.addEventListener('click', newCommentHandler);