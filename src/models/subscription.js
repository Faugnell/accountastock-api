class Subscription {
    constructor(id_subscription, id_user, subscriptionType, subscriptionDuration, startDate, endDate, subscriptionPrice) {
        this.id_subscription = id_subscription;
        this.id_user = id_user;
        this.subscriptionType = subscriptionType;
        this.subscriptionDuration = subscriptionDuration;
        this.startDate = startDate;
        this.endDate = endDate;
        this.subscriptionPrice = subscriptionPrice;
    }
}

module.exports = Subscription;