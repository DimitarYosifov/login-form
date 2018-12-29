const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('users', ['users']);
// Get All Users
router.get('/users', function (req, res, next) {
    db.users.find(function (err, users) {
        if (err) {
            res.status(404);
            res.send(err);
        }
        res.json(users);
    });
});

// Check Login
router.post('/login', function (req, res, next) {
    db.users.find({"nickname": req.body.nickname, "password": req.body.password}, function (err, result) {
        if (err) {
            res.status(404);
            res.send(err);
        }
        let id;
        let user;
        if (result[0]) {
            id = result[0]._id,
                    user = result[0];
        }
        res.json({
            user: user,
            u_id: id,
            success: result.length > 0
        });
    });
});

// Check Unique Nickname 
router.post('/uniqueNickname', function (req, res, next) {
    let user = req.body;
    db.users.find({"nickname": user.nickname}, function (err, result) {
        if (err) {
            res.status(404);
            res.send(err);
        }
        res.json({
            success: result.length === 0
        });
    });
});

// Check Unique Email 
router.post('/uniqueEmail', function (req, res, next) {
    let user = req.body;
    db.users.find({"email": user.email}, function (err, result) {
        if (err) {
            res.status(404);
            res.send(err);
        }
        res.json({
            success: result.length === 0
        });
    });
});

//Save User
router.post('/users', function (req, res, next) {
    let user = req.body;
    if (!user) {
        res.status(404);
        res.json({
            error: 'information is invalid'
        });
    } else {
        db.users.save(user, function (err, user) {
            if (err) {
                res.status(404);
                res.send(err);
            }
            res.json(user);
        });
    }
});

// Delete User
//router.delete('/users/:id', function (req, res, next) {
//    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, user) {
//        if (err) {
//            res.status(404);
//            res.send(err);
//        }
//        res.json(user);
//    });
//});

// Update User
router.put('/users/:id', function (req, res, next) {
    let user = req.body;
//    console.log(req.params);  
    let updatedUser = {};
    if (user) {
        updatedUser = user;
        //this is necessary to prevent overwriting errors
        delete updatedUser._id;
    }
    db.users.update(
            {_id: mongojs.ObjectId(req.params.id)}, updatedUser, function (err, updatedUser) {
        if (err) {
            res.status(404);
            res.send(err);
        }
        res.json(user);
    });
});
module.exports = router;