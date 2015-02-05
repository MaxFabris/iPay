var logger = require('../utils/logger'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    ExpenseModel = require('../models/expense');

function ExpensesCtrl() {
    var me = this;

    me.list = function (req, res) {
        var userId = req.user.id,
            tag = req.query.tag,
            from = req.query.from,
            to = req.query.to,
            query = {
                userId: userId
            };

        if (!_.isEmpty(tag)) query.tags = tag;
        if (!_.isEmpty(from)) query.date = {'$gt': new Date(Number(from))};
        if (!_.isEmpty(to)) {
            if (!query.date) query.date = {};
            query.date = {'$lt': new Date(Number(to))};
        }

        ExpenseModel.find(query, function (err, expenses) {

            if (err) {
                logger.trace(err);
                return res.status(500).send(err.toStrting());
            }

            expenses.forEach(function (expense, index) {
                expenses[index] = expense.formatResponse();
            });

            res.json(expenses);
        })
    };

    me.insert = function (req, res) {
        var expense = req.body;

        if (_.isEmpty(expense) ||
            _.isEmpty(expense.name) || !(_.isNumber(expense.amount) && expense.amount >= 0)) {
            return res.status(400).send('Missing name or amount of the expense');
        }

        expense.userId = req.user.id;
        expense.date = new Date(Number(expense.date)) || new Date();
        ExpenseModel.create(expense, function (err, expense) {
            if (err) {
                logger.trace(err);
                return res.status(500).send(err.toString());
            }

            res.status(201).json(expense.formatResponse());
        });


    };

    me.single = function (req, res) {
        var expenseId = req.params.expenseId,
            userId = req.user.id;

        var isValid = mongoose.Types.ObjectId.isValid(expenseId);
        if (!isValid) return res.status(400).send('Invalid expense id');

        ExpenseModel.findOne({_id: expenseId, userId: userId}, function(err, expense) {
            if (err) {
                logger.fatal(err);
                return res.status(500).send(err.toString());
            }

            if (expense) res.json(expense.formatResponse());
            else res.status(404).send('No expense found with this id');
        });
    };

    me.update = function (req, res) {
        var userId = req.user.id,
            expenseId = req.params.expenseId,
            expenseData = req.body;

        var isValid = mongoose.Types.ObjectId.isValid(expenseId);
        if (!isValid) return res.status(400).send('Invalid expense id');

        ExpenseModel.findOne({_id: expenseId, userId: userId}, function (err, expense) {
            if (err) {
                logger.fatal(err);

                return res.status(500).send(err.toString());
            }

            if (_.isEmpty(expense)) res.status(400).send('No expense found with this id');

            expense.merge(expenseData);
            expense.save(function (err, expense) {
                if (err) {
                    logger.fatal(err);

                    return res.status(500).send(err.toString());
                }

                res.json(expense.formatResponse());
            });
        });
    };

    me.destroy = function (req, res) {
        var userId = req.user.id,
            expenseId = req.params.expenseId;

        var isValid = mongoose.Types.ObjectId.isValid(expenseId);
        if (!isValid) return res.status(400).send('Invalid expense id');

        ExpenseModel.findOne({_id: expenseId, userId: userId}, function (err, expense) {
            if (err) {
                logger.fatal(err);

                return res.status(500).send(err.toString());
            }

            if (_.isEmpty(expense)) res.status(400).send('No expense found with this id');

            expense.remove(function (err) {
                if (err) {
                    logger.fatal(err);

                    return res.status(500).send(err.toString());
                }

                res.end();
            });
        });
    };

}

module.exports = new ExpensesCtrl();