/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Constants = sails.config.constants;


module.exports = {
    //for creating a new user
    signup: async (req, res) => {
        //hashing password using helper
        const hash = await sails.helpers.hashPassword.with({
            password: req.body.password
        })
        //creating a user
        const user = await User.create({
            id: Constants.uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            password: hash.hash
        })
            .fetch()

        // sending a welcome mail using helper
        await sails.helpers.nodemailer.with({
            user: Constants.userName,
            pass: Constants.pass,
            to: req.body.email
        });
        //for creating default account after signup
        await Account.create({
            id: Constants.uuid.v4(), //generating uuid
            AName: req.body.name,
            user: user.id,
        })
        return res.status(201).send({ message: 'Signed Up!!' })
    },

    //for login the user
    login: async (req, res) => {
        await User.find({ email: req.body.email })

            .then(async (user) => {
                if (!user) {
                    return res.status(404).send({ message: 'user not found' });
                }
                //for comparing the password
                Constants.bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                    if (err) {
                        return res.status(401).send({ error: err });
                    }
                    if (result) {
                        //signing the token using helper
                        const token = await sails.helpers.generateToken.with({
                            data:  {id: user[0].id},
                            expiresIn: 3600
                        });
                        //creating a cookie and storing token inside cookie
                        res.cookie("jwt", token.token, {
                            httpOnly: true,
                            // secure: true
                        })
                        return res.status(200).send({ message: "logged in!!", token: token.token, user: user })
                    }
                    res.status(500).send({ message: "Invalid details" })
                })
            })

    },

    //add users to account using email
    addEmail: async (req, res) => {
        let id = req.body.id;
        let email = req.body.email;
        try {
            // find email in users
            let user = await User.findOne({ email })
                .populate('accounts') //populating account model
            //many-to-many association used
            await Account.addToCollection(id, 'users', user.id)
            console.log(user.id);
            // find id in account
            let user1 = await Account.find({ id: id }).populate('users') //populating users
            console.log(user1[0].users);
            res.status(200).send(user1)
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },

    //for getting all users
    list: async (req, res) => {
        try {
            //finding all users
            await User.find({})
                .populate('accounts') //populating account model
                .then((users) => {
                    res.status(200).send({ users: users });
                });
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },

    //for getting user by specific id
    show: async (req, res) => {
        const id = req.params.id;
        try {
            //finding user with its id
            await User.findOne({ id: id })
                .populate('accounts') //populating account model
                .then((user) => {
                    if (!user) {
                        return res.status(404).send({ message: 'User not found' })
                    }
                    res.status(200).send({ user: user });
                });
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },

    //for updating any particular user by id
    update: async (req, res) => {
        let name = req.body.name;
        let id = req.params.id;
        try {
            // updating user with its id
            await User.update({ id: id }, { name: name })
                .then(() => {
                    res.status(200).send({ message: "user updated" });
                });
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },

    //for log out by id 
    logout: (req, res) => {
        try {
            const id = req.params.id;
            User.findOne({ id: id })
                .then((user) => {
                    if (!user) {
                        return res.status(404).send({ message: 'User not found' })
                    }
                    //clearing cookies 
                    res.clearCookie('jwt');
                    res.status(200).send({ message: 'User Logout!!' })
                });
        } catch (error) {
            res.send({ error: error });
            console.log(error);
        }

    }

};

