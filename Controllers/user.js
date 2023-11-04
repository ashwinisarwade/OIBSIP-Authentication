const util = require('../util')
const crypto = require('crypto')
const userDetails = []

/**
 * To check user exist already if not create user
 * @param {object} req 
 * @param {object} res 
 * @returns 
 */
exports.createNewUser = async (req, res) => {
    try {
        const reqBody = req.body
        const isUserExist = checkUserAlreadyExist(reqBody.email)
        if (isUserExist) {
            return res.render('signup', {
                isError: true,
                message: "User alredy exist."
            })
        }
        return registerUser(reqBody, req, res)
    } catch (error) {
        console.log(error)
        res.send(util.somethingWentWrong())
    }
}


/**
 * To check user alredy exist (email in objects of array)
 * @param {string} email 
 * @returns 
 */
function checkUserAlreadyExist(email) {

    if (!userDetails || userDetails.length === 0) {
        return false;
    }

    let userExists = userDetails.some((user) => user.email === email);

    return userExists;
}


/**
 * To register new user
 * @param {object} reqBody 
 * @param {object} req 
 * @param {object} res 
 * @returns 
 */
const registerUser = async (reqBody, req, res) => {
    try {

        const createUser = {
            name: reqBody.name,
            email: reqBody.email,
            phone: reqBody.phone,
            password: generateHash(reqBody.password),
            is_enabled: 1,
        }

        userDetails.push(createUser)

        req.session.user = createUser
        return res.redirect('home')

    } catch (error) {
        console.log(error)
        res.send(util.somethingWentWrong())
    }
}

/**
 * Hash password
 * @param {string} password 
 * @returns {string} - password in hash
 */
function generateHash(password) {

    const hash = crypto.createHash('sha512');
    const hashBuffer = hash.update(password, 'utf-8').digest();
    const hashString = hashBuffer.toString('hex');
    return hashString;
}

/**
 * To check email and password correct for login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.loginUser = async (req, res) => {
    try {
        console.log('inside user login')
        const reqBody = req.body
        console.log(reqBody.email)
        console.log(reqBody.password)
        const isUserExist = checkUserAlreadyExist(reqBody.email)
        if (!isUserExist) {
            return res.render('login', {
                isError: true,
                message: "Email not found"
            })
        }

        return checkValidPassword(reqBody, req, res)
    } catch (error) {
        console.log(error)
        res.send(util.somethingWentWrong())
    }
}

/**
 * To check whether passsword correct or incorrect
 * @param {object} reqBody 
 * @param {object} req 
 * @param {object} res 
 * @returns 
 */
const checkValidPassword = async (reqBody, req, res) => {
    const hashPassword = crypto.createHash('sha512').update(reqBody.password).digest('hex');

    const data = userDetails.find((user) => user.email === reqBody.email)

    if (hashPassword !== data.password) {
        return res.render('login', {
            isError: true,
            message: "Password does not match."
        })
    }
    req.session.user = data
    return res.redirect('home')
}

/**
 * To check reset password , requested email is valid
 * @param {object} req 
 * @param {object} res 
 * @returns 
 */
exports.resetPassword = (req, res) => {
    try {
        const reqBody = req.body
        const isUserExist = checkUserAlreadyExist(reqBody.email)
        if (!isUserExist) {
            return res.render('forgot-password', {
                isError: true,
                message: "User not exist."
            })
        }

        return changeUserPassword(reqBody, req,res)
    } catch (error) {
        console.log(error)
    }
}


/**
 * To changes user password
 * @param {object} reqBody 
 * @returns 
 */
function changeUserPassword(reqBody,req,res) {
    const hashPassword = crypto.createHash('sha512').update(reqBody.password).digest('hex');

    const data = userDetails.find((user) => user.email === reqBody.email)

    data.password = hashPassword

    req.session.user = data
    return res.redirect('home')
}