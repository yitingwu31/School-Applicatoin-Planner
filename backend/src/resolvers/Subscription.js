const Subscription = {
    todo: {
        async subscribe(parent, { user }, { pubsub }, info) {
            return pubsub.asyncIterator(`todo ${user}`);
        }
    },
    checkpoint: {
        async subscribe(parent, { user }, { pubsub }, info) {
            return pubsub.asyncIterator(`checkpoint ${user}`);
        }
    }
}

// export { Subscription as default };