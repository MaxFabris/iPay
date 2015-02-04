var logger = require('../utils/logger');
    _ = require('lodash'),
    ExpenseModel = require('../models/expense')

function ExpensesCtrl () {
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
        if (!_.isEmpty(from)) query.date = { '$gt': from};
        if (!_.isEmpty(to)) {
            if (!query.date) {
                query.date = {};
            }
            query.date = { '$lt': to};
        }

        ExpenseModel.find(query, function (err, expenses) {

            if (err) {
                logger.trace(err);
                return res.status(500).send(err.toStrting());
            }

            expenses.forEach(function(expense, index) {
                expenses[index] = expense.formatResponse();
            })

            res.json(expenses);
        })
    }

    me.insert = function (req, res) {
        var expense = req.body;

        if (_.isEmpty(expense) ||
            _.isEmpty(expense.name) ||
            !(_.isNumber(expense.amount) && expense.amount >= 0)) {
            return res.status(400).send('Missing name or amount of the expense');
        }

        expense.userId = req.user.id;
        expense.date = new Date();
        ExpenseModel.create(expense, function (err, expense) {
           if (err) {
               logger.trace(err);
               return res.status(500).send(err.toString());
           }

            res.status(201).json(expense.formatResponse());
        });


    }

    me.single = function (req, res) {

    }

    me.update = function (req, res) {

    }

    me.destroy = function (req, res) {

    }

}

module.exports = new ExpensesCtrl();