import { makeSchoolKey } from "../utils";

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
    },

    // updateSchool(parent, { data }, { db }, info) {

    // },

    async createTodo(parent, { owner, school, data }, { db }, info) {
        const key = makeSchoolKey(owner, school);
        let schoolcard = await db.SchoolModel.findOne({ key });
        if (!schoolcard) {
            throw new Error("School has not been created!");
        }
        let newtodolist = [];
        await Promise.all(
            data.map(async (todo) => {
                const { task, deadline, comment } = todo;
                let newtodo = await new db.TodoModel({ key, task, deadline, comment }).save();
                newtodolist.push(newtodo);
            })
        ).catch ((e) => console.log(e));
        // console.log(newtodolist);
        schoolcard.todos.push(...newtodolist);
        await schoolcard.save();
        return newtodolist;
    },

    // updateTodo(parent, { data }, { db }, info) {

    // },

    async createCheckpoint(parent, { owner, school, task, data }, { db }, info) {
        const schoolkey = makeSchoolKey(owner, school);
        const key = `${schoolkey}-${task}`;
        let todo = await db.TodoModel.findOne({ key: schoolkey, task });
        if (!todo) {
            throw new Error("Todo has not been created!");
        }
        let newcheckpointlist = [];
        await Promise.all(
            data.map(async (checkpoint) => {
                const { content, time } = checkpoint;
                let newcheckpoint = await new db.CheckpointModel({ key, content, time }).save();
                newcheckpointlist.push(newcheckpoint);
            })
        ).catch ((e) => console.log(e));
        todo.checkpoints.push(...newcheckpointlist);
        await todo.save();
        return newcheckpointlist;
    }
}

export { Mutation as default };