import { makeSchoolKey } from "../utils";

const Query = {
    async user(parent, { name }, { db }, info) {
        const user = await db.UserModel.findOne({ name });
        return user
            .populate('schools')
            .populate({ path: 'schools', populate: 'todos' })
            .execPopulate();
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
        let allTodos = await db.TodoModel.find().populate('checkpoints');
        let findtodos = allTodos.filter((todo) => {
            return todo.key.split('-')[0] === user;
        })
        findtodos = findtodos.filter((todo) => {
            let date = todo.deadline.split('-');
            return date[0] == year && date[1] == month;
        })
        return findtodos;
    }, 

    async userMonthCheckpoint(parent, { user, year, month }, { db }, info) {
        let allCheckpoints = await db.CheckpointModel.find();
        let findcheckpoints = allCheckpoints.filter((check) => {
            return check.key.split('-')[0] === user;
        })
        findcheckpoints = findcheckpoints.filter((check) => {
            let date = check.time.split('-');
            return date[0] == year && date[1] == month;
        })
        return findcheckpoints;
    }
};

export { Query as default };