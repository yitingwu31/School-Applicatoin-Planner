const Todo = {
    checkpoints(parent, args, { db }, info) {
        return Promise.all(
            parent.checkpoints.map((tId) => db.CheckpointModel.findById(tId)),
        );
    },
};

export default Todo;