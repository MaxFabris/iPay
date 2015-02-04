var express = require('express'),
    router = express.Router(),
    ExpensesCtrl = require('../controllers/expenses');

router.route('/expenses')
    .get(ExpensesCtrl.list)
    .post(ExpensesCtrl.insert);

router.route('/expenses/:expenseId')
    .get(ExpensesCtrl.single)
    .put(ExpensesCtrl.update)
    .delete(ExpensesCtrl.destroy);

module.exports = router;