const Subscription = {
    school: {
        async subscribe(parent, { user }, { db, pubsub }, info) {
            let student = await db.UserModel.findOne({ name: user });
            if (!student) {
                throw new Error("User not found!");
            }
            return pubsub.asyncIterator(`school ${user}`);
        }
    }
}

export { Subscription as default };