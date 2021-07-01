import { missingDisplay, checkDeadline, checkDeadlineWeek } from "../utils";

const findUser = async (name, db) => {
    const user = await db.UserModel.findOne({ name });
    if (!user) {
        return null;
    }
    return user
        .populate('password')
        .populate('schools')
        .populate({ path: 'schools', populate: 'todos' })
        .populate({ path: 'schools', populate: { path: 'todos', populate: 'checkpoints' } })
        .execPopulate();
}

// in a month
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

// in a month
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

// in a week only uncompleted
const findTodoWeek = async (user, dates, db) => {
    let allTodos = await db.TodoModel.find().populate('checkpoints');
    let findtodos = allTodos.filter((todo) => {
        return todo.key.split('-')[0] === user;
    });
    findtodos = findtodos.filter((todo) => {
        return checkDeadlineWeek(dates, todo.deadline) && todo.completed === false;
    });
    return findtodos;
}

// in a week only uncompleted
const findCheckpointWeek = async (user, dates, db) => {
    let allCheckpoints = await db.CheckpointModel.find();
    let findcheckpoints = allCheckpoints.filter((check) => {
        return check.key.split('-')[0] === user;
    })
    findcheckpoints = findcheckpoints.filter((check) => {
        return checkDeadlineWeek(dates, check.time) && check.completed === false;
    })
    return findcheckpoints;
}

const Query = {
    async user(parent, { name, password }, { db }, info) {
        const user = findUser(name, db)
        if (user !== null) {
            //Checking password
            if (user.password === password) {
                return user
            }
            else {
                throw new Error("User exists, but wrong password!")
            }
        }
    },

    async userSchool(parent, { user }, { db }, info) {
        const student = await findUser(user, db);
        if (student == null) {
            console.log("User not found");
            return [];
        }
        return student.schools;
    },

    async userMonthTodo(parent, { user, year, month }, { db }, info) {
        return findTodo(user, year, month, db);
    },

    async userMonthCheckpoint(parent, { user, year, month }, { db }, info) {
        return findCheckpoint(user, year, month, db);
    },

    async allByDate(parent, { user, year, month }, { db }, info) {
        let ret = [];
        let todos = await findTodo(user, year, month, db);
        let checkpoints = await findCheckpoint(user, year, month, db);
        todos.map((todo) => {
            if (checkDeadline(year, month, todo.deadline)) {
                let s = todo.key.split('-');
                ret.push({ type: 'todo', context: `${s[1]} ${missingDisplay(todo.task)}`, deadline: todo.deadline, completed: todo.completed });
            }
        })
        checkpoints.map((check) => {
            if (checkDeadline(year, month, check.time)) {
                let s = check.key.split('-');
                ret.push({ type: 'checkpoint', context: `${s[1]} ${missingDisplay(s[2])} ${check.content}`, deadline: check.time, completed: check.completed });
            }
        })
        return ret;
    },

    // only return uncompleted
    async allInWeek(parent, { user, dates }, { db }, info) {
        let ret = [];
        let todos = await findTodoWeek(user, dates, db);
        let checkpoints = await findCheckpointWeek(user, dates, db);
        todos.map((todo) => {
            let s = todo.key.split('-');
            ret.push({ type: 'todo', context: `${s[1]} ${missingDisplay(todo.task)}`, deadline: todo.deadline, completed: todo.completed });
        })
        checkpoints.map((check) => {
            let s = check.key.split('-');
            ret.push({ type: 'checkpoint', context: `${s[1]} ${missingDisplay(s[2])} ${check.content}`, deadline: check.time, completed: check.completed });
        })
        return ret;
    }
};

export { Query as default };