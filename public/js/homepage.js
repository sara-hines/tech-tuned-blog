// Load the animation JSON file
var animationData = {
container: document.getElementById('animation-container'),
renderer: 'svg',
loop: true,
autoplay: true,
path: '/img/animation2.json' // Path to your JSON animation file
};
// Display the animation
var anim = lottie.loadAnimation(animationData);
