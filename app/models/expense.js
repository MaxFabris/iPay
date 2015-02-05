var mongoose = require('mongoose'),
    ExpenseSchema = new mongoose.Schema({
        userId: String,
        name: String,
        description: String,
        amount: Number,
        category: String,
        tags: [String],
        date: Date
    });

ExpenseSchema.method('formatResponse', function () {
    var exp = this.toObject();

    delete exp.__v;
    delete exp._id;
    delete exp.userId;

    return exp;
});

ExpenseSchema.method('merge', function (expenseData) {
    this.name = expenseData.name || this.name;
    this.date = expenseData.date || this.date;
    this.description = expenseData.description || this.description;
    this.amount = expenseData.amount || this.amount;
    this.category = expenseData.category || this.category;
    this.tags = expenseData.tags || this.tags;

    return this;
});


module.exports = mongoose.model('Expense', ExpenseSchema);