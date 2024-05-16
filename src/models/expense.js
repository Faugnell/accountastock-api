class Expense {
    constructor(id_expense, title, note, amount, tax_percent, fk_id_user, date) {
        this.id_expense = id_expense;
        this.title = title;
        this.note = note;
        this.amount = amount;
        this.tax_percent = tax_percent;
        this.fk_id_user = fk_id_user;
        this.date = date;
    }
}

module.exports = Expense;