const School = {
    todos(parent, args, { db }, info) {
        return Promise.all(
            parent.todos.map((tId) => db.TodoModel.findById(tId)),
        );
    },
};

export default School;