/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    //for creating new account
    create: (req, res) => {
        const id = req.body.id
        try {
            User.findOne(id)
                .then(async (user) => {
                    if (user) {
                        //creating an account
                        await Account.create({
                            AName: req.body.AName,
                            user: req.body.id,
                        })
                        res.status(201).send({ message: "New Account Created!!" })
                    }
                    else {
                        return res.status(404).send({ message: 'Default Id not found' })
                    }
                })
        } catch (error) {
            return res.status(500).send({ error: error });
        }

    },

    // for getting all accounts
    list: async (req, res) => {
        try {
            await Account.find({})
                .populate('transactions', { sort: 'date DESC' })  //populating transaction model with sorting of dates
                .then((accounts, transactions) => {
                    res.status(200).send({ count: accounts.length, accounts: accounts, transactions: transactions });
                });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },

    //for getting account by specific id
    showAccount: (req, res) => {
        try {
            const id = req.params.id;
            Account.findOne({ id: id })
                //populating transaction model with sorting of dates
                .populate('transactions', { sort: 'date DESC' })
                .then((account, transactions) => {
                    if (!account) {
                        return res.status(404).send({ message: 'Account not found' })
                    }
                    res.status(200).send({ account: account, transactions: transactions });
                });
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },

    //for updating account name using id
    edit: async (req, res) => {
        const AName = req.body.AName;
        const id = req.params.id;
        try {
            //for edit of any account name using its id
            await Account.update({ id: id }, { AName: AName })
                .then(() => {
                    res.status(200).send({ message: "Account updated" });
                });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },

    // for deleting any account by id
    delete: async (req, res) => {
        try {
            const accountId = req.params.id;
            await Account.destroyOne({ id: accountId })
                .then((accountId) => {
                    if (!accountId) {
                        return res.status(404).send({ message: 'Id not found' })
                    }
                    res.status(200).send({ message: "Account deleted" });
                })
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }

};
