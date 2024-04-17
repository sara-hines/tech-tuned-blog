const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const formatDate = (date) => {
    // Check if 'date' is a valid Date object
    if (!(date instanceof Date)) {
        // If 'date' is not a Date object, try converting it to one
        date = new Date(date);
    }

    // Check if 'date' is a valid Date object after attempted conversion; return an empty string if it's still not a valid Date object.
    if (!(date instanceof Date)) {
        return '';
    }
    
    // Format the date as a string using toLocaleDateString()
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
}

function debounce(func, wait) {
    let timeout;

    return function() {
        const context = this;
        const args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

const searchHandler = async () => {
    const query = searchInput.value.trim();

    if (query === '') {
        searchResults.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`/find-post?query=${query}`);
        const blogs = await response.json();
        searchResults.innerHTML = '';
        blogs.forEach(blog => {
            const blogWrapper = document.createElement('div');
            searchResults.appendChild(blogWrapper);

            const blogTitle = document.createElement('a');
            blogTitle.setAttribute('href', `/blog/${blog.id}`);
            blogTitle.textContent = blog.title;
            blogWrapper.appendChild(blogTitle);

            const blogCreatedOn = blog.date_created;
            let formattedDate = formatDate(blogCreatedOn);
            const dateCreated = document.createElement('span');
            dateCreated.textContent = formattedDate;
            blogWrapper.appendChild(dateCreated);
        });
    } catch (err) {
        console.error(err);
    }
};

const debouncedSearch = debounce(searchHandler, 300);

searchInput.addEventListener('input', debouncedSearch);