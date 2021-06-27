
const Query = {
    async user(parent, { name }, { db }, info) {
        const user = await db.UserModel.findOne({ name });
        return user;
    }
}