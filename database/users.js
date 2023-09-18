import Users from '../models/users.js';

const findById = async (id, cb) => {
  const user = await Users.findOne({ id }).select('-__v');
  console.log(user);
  process.nextTick(function () {
    if (user) {
      cb(null, user);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
};

const findByUsername = async (login, cb) => {
  const user = await Users.findOne({ login }).select('-__v');
  process.nextTick(function () {
    if (user) {
      console.log(user);
      return cb(null, user);
    }
    return cb(null, null);
  });
};

const verifyPassword = (user, password) => {
  return user.password === password;
};

export { findById, findByUsername, verifyPassword };
