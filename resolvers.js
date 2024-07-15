const Users = require('./schemas/UserSchema.js');

const resolvers = {
  Query: {
    getUsers: async (_, { username }) => {
      return await Users.findById(username);
    },
    getAllUsers: async () => {
      return await Users.find();
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const { fname, lname, username, phone, email, password } = input;
        if(!fname){
          throw new Error('First name is required');
        }
        if(!lname){
          throw new Error('Last name is required');
        }
        if(!username){
          throw new Error('Username is required');
        }
        if(!phone){
          throw new Error('Phone number is required');
        }
        if(!email){
          throw new Error('Email is required');
        }
        if(!password){
          throw new Error('Password is required');
        }
        const newUser = new Users({ fname, lname, username, phone, email, password });
        return await newUser.save();
      } catch (err) {
        throw new Error(err.message);
      }
    },
    changePass: async (_, { username, password }) => {
      try {
        const user = await Users.findByIdAndUpdate(username, { password }, { new: true });
        if (!user) {
          throw new Error('User not found.');
        }
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Users: {
    lname: (parent) => parent.lname || '',
    username: (parent) => parent.username || '',
    phone: (parent) => parent.phone || '',
    email: (parent) => parent.email || '',
    fname: (parent) => parent.fname || '',
    password: (parent) => parent.password || ''
  },
};

module.exports = resolvers;