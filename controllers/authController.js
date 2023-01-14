const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError')
const User = require('../models/users.js')
const catchAsync = require ('../utils/catchAsync')
const crypto = require('crypto')
const bcrypt = require("bcrypt")

salt = crypto.randomBytes(16).toString('hex')

const signToken = _id => {
    return jwt.sign({ _id: _id }, process.env.SECRET, {
      expiresIn:  '1h'
    });
  };

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
  
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + (60 * 60 * 1000)),
      httpOnly: true
    });
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
  var salt = bcrypt.genSaltSync(10);
  const name = req.body.name
    const email = req.body.email
  const encry_password= req.body.encry_password
  bcrypt.hash(encry_password, salt, async (err, hashedPw) => {
    if(err){
        console.log(err.message)
        return err
    }
    const user = new User({
      name: name,
      encry_password: hashedPw,
      email: email
    })

    user.save()
     .then((user) => {
        res.json({ user})
      })
      .catch((err) => {
        res.send(err)
      })
  })
     
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, encry_password } = req.body;
  
    if (!email || !encry_password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(encry_password, user.encry_password))) {
      return next(new AppError('Incorrect email or password', 401));
    }  
    createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  next();
});

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        // 2) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
  
        // THERE IS A LOGGED IN USER
        res.locals.user = currentUser;
        return next();
      } catch (err) {
        console.log(err.message);
        return next();
      }
    }
    next();
};


