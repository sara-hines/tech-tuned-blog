const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    // THIS IS HOW WE'RE MAKING IT SO THAT WHEN THE USER CLICKS THE BUTTON TO LOG IN, WE WILL RECIEVE A POST REQUEST TO http://localhost:3001/api/users/login, WHICH WE PREPARED A RESPONSE FOR IN controllers/api/userRoutes.js. What response did we prepare there? We will check if we have a user in our database with the provided email, we will check if the user entered the right password, and we'll save a user_id and logged_in of true to the session obj. (Assuming all goes well)
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If we were able to make a successful POST request to http://localhost:3001/api/users/login in order to let the user log in, we will redirect the browser to the profile page, which should just be http://localhost:3001/profile
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};


document
  // .querySelector('.login-form') selects the first element with the class of login-form, which is the form element itself, which has the input elements etc nested inside it
  .querySelector('.login-form')
  // The event listener is added to the form element which we were able to select using the previous line. So, we're listening on the whole form element for the submit event. When the submit event happens, the loginFormHandler function is called.
  .addEventListener('submit', loginFormHandler);


// Load the animation JSON file
var animationData = {
  container: document.getElementById('animation-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/img/login-animation.json' // Path to JSON animation file
};
// Display the animation
var anim = lottie.loadAnimation(animationData);

