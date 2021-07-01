import { makeSchoolKey, makeCheckpointKey } from "../utils";

const checkUser = async (db, name) => {
    let user = await db.UserModel.findOne({ name });
    if (!user) {
        console.log("Creating user ", name);
        user = await new db.UserModel({ name }).save();
    }
    return user
        .populate({ path: 'schools', populate: 'todos' })
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
        let user = await checkUser(db, owner);
        const key = makeSchoolKey(owner, name);
        let newschool = await db.SchoolModel.findOne({ key });
        if (!newschool) {
            newschool = await new db.SchoolModel({ key, name, deadline, completed: false }).save();
            user.schools.push(newschool);
            await user.save();
        } else {
            newschool.deadline = deadline;
            await newschool.save();
        }
        return newschool;
    },

    async updateSchool(parent, { user, school, date }, { db }, info) {
        const key = makeSchoolKey(user, school );
        try {
            let school = await db.SchoolModel.findOne({ key });
            school.deadline = date
            await school.save()

        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    },

    async completeSchool(parent, { key }, { db }, info) {
        try {
            let school = await db.SchoolModel.findOne({ key });
            school.completed = true;
            await school.save();
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    },

    async createTodo(parent, { owner, school, data }, { db, pubsub }, info) {
        const key = makeSchoolKey(owner, school);
        let schoolcard = await db.SchoolModel.findOne({ key });
        if (!schoolcard) {
            throw new Error("School has not been created!");
        }
        let newtodolist = [];
        await Promise.all(
            data.map(async (todo) => {
                const { task, deadline, comment } = todo;
                let newtodo = await db.TodoModel.findOne({ key, task });
                if (!newtodo) {
                    newtodo = await new db.TodoModel({ key, task, deadline, comment, completed: false }).save();
                    newtodolist.push(newtodo);
                } else {
                    newtodo.deadline = deadline;
                    newtodo.comment = comment;
                    await newtodo.save();
                }
            })
        ).catch((e) => console.log(e));
        // console.log(newtodolist);
        schoolcard.todos.push(...newtodolist);
        await schoolcard.save();
        pubsub.publish(`school ${owner}`, {
            school: {
                mutation: 'CREATED',
                data: schoolcard
            }
        })
        return newtodolist;
    },

    async updateTodo(parent, { user, school, task, date }, { db }, info) {
        const key = makeSchoolKey(user, school);
        try {
            let todo = await db.TodoModel.findOne({ key, task });
            todo.deadline = date;
            await todo.save();
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    },

    async completeTodo(parent, { user, school, task }, { db }, info) {
        const key = makeSchoolKey(user, school);
        try {
            let todo = await db.TodoModel.findOne({ key, task });
            todo.completed = true;
            await todo.save();
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    },

    async createCheckpoint(parent, { owner, school, task, data }, { db, pubsub }, info) {
        const schoolkey = makeSchoolKey(owner, school);
        let schoolcard = await db.SchoolModel.findOne({ key: schoolkey });
        const key = makeCheckpointKey(owner, school, task);
        let todo = await db.TodoModel.findOne({ key: schoolkey, task });
        if (!todo) {
            throw new Error("Todo has not been created!");
        }
        let newcheckpointlist = [];
        await Promise.all(
            data.map(async (checkpoint) => {
                const { content, time } = checkpoint;
                let newcheckpoint = await db.CheckpointModel.findOne({ key, content });
                if (!newcheckpoint) {
                    newcheckpoint = await new db.CheckpointModel({ key, content, time, completed: false }).save();
                    newcheckpointlist.push(newcheckpoint);
                } else {
                    newcheckpoint.time = time;
                    await newcheckpoint.save();
                }
            })
        ).catch((e) => console.log(e));
        todo.checkpoints.push(...newcheckpointlist);
        await todo.save();
        pubsub.publish(`school ${owner}`, {
            school: {
                mutation: 'CREATED',
                data: schoolcard
            }
        })
        return newcheckpointlist;
    },

    async updateCheckpoint(parent, { user, school, task, content, date }, { db }, info) {
        const key = makeCheckpointKey(user, school, task);
        try {
            let checkpoint = await db.CheckpointModel.findOne({ key, content });
            checkpoint.time = date;
            await checkpoint.save();
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    },

    async completeCheckpoint(parent, { user, school, task, content }, { db }, info) {
        const key = makeCheckpointKey(user, school, task);
        try {
            let checkpoint = await db.CheckpointModel.findOne({ key, content });
            checkpoint.completed = true;
            await checkpoint.save();
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }
}

export { Mutation as default };