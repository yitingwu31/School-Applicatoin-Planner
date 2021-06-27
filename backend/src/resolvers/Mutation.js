import { convertTimeString, makeSchoolKey } from "../utils";

const checkUser = async (db, name) => {
    let user = await db.UserModel.findOne({ name });
    if (!user) {
        console.log("Creating user ", name);
        user = await new db.UserModel({ name }).save();
    }
    return user
        .populate({ path: 'schools', populate: 'todos'})
        .execPopulate();
}


const Mutation = {
    async createUser(parent, { name }, { db }, info) {
        let user = await db.UserModel.findOne({ name });
        if (user) {
            throw new Error("User already exists!");
        }
        user = await new db.UserModel({ name }).save();
        return user;
    },

    async createSchool(parent, { data }, { db }, info) {
        const { owner, name, deadline } = data;
        // owner: username, name: school name
        let user = await checkUser(db, owner);
        const key = makeSchoolKey(owner, name);
        let newschool = await new db.SchoolModel({ key, name, deadline }).save();
        user.schools.push(newschool);
        await user.save();

        return newschool;
    }

    // updateSchool(parent, { data }, { db }, info) {

    // }
}

export { Mutation as default };