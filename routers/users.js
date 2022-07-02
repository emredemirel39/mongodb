const router = require('express').Router();
const User = require('../models/user');


// CRUD

// GET all

router.get('/', async (req, res) => {

try {
    const users = await User.find();
    res.status(200).json(users)
} catch (error) {

    const { message } = error
    next({
        statusCode: 500,
        message
    }).end()

    //res.status(500).json({message: error.message}).end()
}

})

// GET one

router.get('/:id', getUser, (req, res) => {

    res.status(200).json(res.user)
    
})

// CREATE one

router.post('/', async (req, res, next) => {

    const user = new User(req.body)
    try { 
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {

        const { message } = error
        next({
            statusCode: 400,
            message
        })
    }
})

// DELETE one

router.delete('/:id', getUser, async (req, res, next) => {

     try {

        const user = await User.findByIdAndDelete(res.user.id)
        res.status(204).json({user}) //deletes but not sends user as json object
        //res.status(202).json({user}) //deletes and sends deleted user as json
        
     } catch (error) {

        const { message } = error
        next({
            statusCode: 500,
            message
        })
     }
    
    
})

// UPDATE one

router.patch('/:id', async (req, res, next) => {


    if(!req.body) {
        return next({
            statusCode: 400,
            message: 'User data to update cannot be empty!'
        });
    }

    try {
        const user = await User.findById(req.params.id)
        Object.assign(user, req.body)
        user.save();
        res.status(200).json(user)
    } catch (error) {
        const { message } = error;
        next({
            statusCode: 500,
            message
        });
    };
    
})

// middlewares

async function getUser (req, res, next) {
    let user

    try {
        user = await User.findById(req.params.id);

        if (user == null) {
            return  next({
                statusCode: 404,
                message: 'User not found!'
            })
            // res.status(404).json({message: 'User not found!'})
        }

    } catch (error) {
        const { message } = error;

        next({
            statusCode: 500,
            message
        })
    }

    res.user = user;
    next();
};

module.exports = router;