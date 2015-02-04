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
})

module.exports = mongoose.model('Expense', ExpenseSchema);