class User {
    constructor(id_user, mail, password, name, firstname, siret, company_name, birthday) {
        this.id_user = id_user;
        this.mail = mail;
        this.password = password;
        this.name = name;
        this.firstname = firstname;
        this.siret = siret;
        this.company_name = company_name;
        this.birthday = birthday;
    }
}

module.exports = User;