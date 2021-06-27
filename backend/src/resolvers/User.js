const User = {
    schools(parent, args, { db }, info) {
        return Promise.all(
            parent.schools.map((sId) => db.SchoolModel.findById(sId)),
        );
    },
};

export default User;