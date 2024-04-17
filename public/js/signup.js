
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    // What are we trying to do here? We're trying to let the user sign up and be registered as a user in our database. We do have a response prepared for when we receive POST requests to make a new user, which we prepared in controllers/api/userRoutes.js, and the url we're expecting to receive these POST requests to is http://localhost:3001/api/users. So, everything looks good so far.
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        // Is this the correct body to send? Yes. This is everything we need to receive in userRoutes.js. The id is autoincremented so it will be automatically added when we User.create(req.body).
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      // If the response we get from the code in userRoutes.js for the http://localhost:3001/api/users POST route is ok, we will send the user to the profile endpoint. WHAT WOULD THE FULL URL BE FOR THE PROFILE ENDPOINT? http://localhost:3001/api/profile?? 
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  