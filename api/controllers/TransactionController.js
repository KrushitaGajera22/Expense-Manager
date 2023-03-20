/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Constants = sails.config.constants;

module.exports = {
    //for creating a transaction
    createTransaction: async (req, res) => {
        try {
            //get data from body to create transaction
            await Transaction.create({
                id: Constants.uuid.v4(),
                types: req.body.types,
                amount: req.body.amount,
                Account: req.body.Account,
                date: req.body.date
            })
            res.status(201).send({ message: "New Transaction added!!" })
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ error: error });
        }
    },

    // for getting all accounts
    listTransaction: async (req, res) => {
        try {
            //finding all transactions
            await Transaction.find({})
                .populate('Account')
                .then((transactions) => {
                    // count used for counting no. of transaction
                    res.status(200).send({ count: transactions.length, transactions });
                });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },

    //for editing anything in transaction 
    editTransaction: async (req, res) => {
        const id = req.params.id;
        try {
            // updating transaction using its id
            await Transaction.update({ id: id }, {
                types: req.body.types,
                amount: req.body.amount,
                date: req.body.date
            }).then((transaction) => {
                res.status(200).send({ message: "Transaction updated", transaction });
            });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },

    //for deleting any transaction using id
    deleteTransaction: async (req, res) => {
        try {
            const transactionId = req.params.id;
            // getting id which is going to be deleted
            await Transaction.destroyOne({ id: transactionId })
                .then((transactionId) => {
                    // for any invalid id
                    if (!transactionId) {
                        return res.status(404).send({ message: 'Transaction not found' })
                    }
                    res.status(200).send({ message: "Transaction deleted" });
                })
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }

};

