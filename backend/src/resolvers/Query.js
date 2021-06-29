import { makeSchoolKey, checkDeadline } from "../utils";

const findUser = async (name, db) => {
    const user = await db.UserModel.findOne({ name });
    return user
        .populate('schools')
        .populate({ path: 'schools', populate: 'todos' })
        .populate({ path: 'schools', populate: { path: 'todos', populate: 'checkpoints' }})
        .execPopulate();
}

const findTodo = async (user, year, month, db) => {
    let allTodos = await db.TodoModel.find().populate('checkpoints');
    let findtodos = allTodos.filter((todo) => {
        return todo.key.split('-')[0] === user;
    })
    findtodos = findtodos.filter((todo) => {
        return checkDeadline(year, month, todo.deadline);
    })
    return findtodos;
}

const findCheckpoint = async (user, year, month, db) => {
    let allCheckpoints = await db.CheckpointModel.find();
    let findcheckpoints = allCheckpoints.filter((check) => {
        return check.key.split('-')[0] === user;
    })
    findcheckpoints = findcheckpoints.filter((check) => {
        return checkDeadline(year, month, check.time);
    })
    return findcheckpoints;
}

const Query = {
    async user(parent, { name }, { db }, info) {
        return findUser(name, db);
    },

    async userSchool(parent, { user, school }, { db }, info) {
        const key = makeSchoolKey(user, school);
        const findschool = await db.SchoolModel.findOne({ key });
        return findschool
            .populate('todos')
            .populate({ path: 'todos', populate: 'checkpoints'})
            .execPopulate();
    },

    async userMonthTodo(parent, { user, year, month }, { db }, info) {
        return findTodo(user, year, month, db);
    }, 

    async userMonthCheckpoint(parent, { user, year, month }, { db }, info) {
        return findCheckpoint(user, year, month, db);
    },

    async allByDate(parent, { user, year, month }, { db }, info) {
        let ret = [];
        // let schools = await findUser(user, db).schools;
        // console.log(schools)
        // schools.forEach((school) => {
        //     if (checkDeadline(year, month, school.deadline)) {
        //         ret.push({ type: 'school', context: school.name, deadline: school.deadline});
        //     }
        // })
        let todos = await findTodo(user, year, month, db);
        let checkpoints = await findCheckpoint(user, year, month, db);
        todos.map((todo) => {
            if (checkDeadline(year, month, todo.deadline)) {
                let s = todo.key.split('-');
                ret.push({ type: 'todo', context: `${s[1]} ${todo.task}`, deadline: todo.deadline});
            }
        })
        checkpoints.map((check) => {
            if (checkDeadline(year, month, check.time)) {
                let s = check.key.split('-');
                ret.push({ type: 'checkpoint', context: `${s[1]} ${s[2]} ${check.content}`, deadline: check.time});
            }
        })
        console.log(ret);
        return ret;
    }
};

export { Query as default };