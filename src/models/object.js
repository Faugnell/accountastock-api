class Object {
    constructor(id_object, title, note, fk_id_user, quantity) {
        this.id_object = id_object;
        this.title = title;
        this.note = note;
        this.fk_id_user = fk_id_user;
        this.quantity = quantity;
    }
}

module.exports = Object;