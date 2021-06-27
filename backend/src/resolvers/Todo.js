const Todo = {
    checkpoints(parent, args, { db }, info) {
        return Promise.all(
            parent.checkpoints.map((cId) => db.CheckpointModel.findById(tId)),
        );
    },
};

export default Todo;