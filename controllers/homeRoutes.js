const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

// GET route to http://localhost:3001 to render the homepage (homepage.handlebars)
// This is correctly rendering the homepage at this endpoint
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll();

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            blogs, 
            logged_in: req.session.logged_in 
        });
        // res.json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET route to http://localhost:3001/login to render the login page (login.handlebars)
// This is correctly rendering the login page at this endpoint.
router.get('/login', async (req, res) => {
    // If the user is already logged in, there will be no login link available for them to click. However, the below conditional helps to protect the flow of the application if the user happens to manually type the /login endpoint in the address bar while already logged in.
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

// GET route to http://localhost:3001/signup to render the signup page (signup.handlebars)
// This is correctly rendering the signup page at this endpoint
router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                { 
                    model: Blog, 
                },
            ],
        });
        // const userData = await User.findByPk(req.session.user_id);

        console.log(userData);

        const user = userData.get({ plain: true });

        console.log(user);
        // res.status(200).json(user);
        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Why in the mini project for the /project/:id GET route did they not use withAuth?? Also, probably specify the attributes to include for User, leaving out password, if we do not use withAuth here.
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                    },
                },
                {
                    model: User,
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog, 
            logged_in: req.session.logged_in
        });

        // res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/new-blog', withAuth, async (req, res) => {
    res.render('new-blog', {
        logged_in: req.session.logged_in
    });
});

router.get('/modify-blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            // DO WE NEED TO INCLUDE THE USER MODEL HERE?
            include: [
                {
                    model: User,
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('modify-blog', {
            ...blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/search', withAuth, async (req, res) => {
    res.render('search', {
        logged_in: req.session.logged_in
    });
});

router.get('/find-post', async (req, res) => {
    const query = req.query.query;

    try {
        const blogs = await Blog.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${query}%` // Case-insensitive search
                }
            },
        });
        res.json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
