// Purpose: Export the resolvers
const {
  User,
  Pokemon,
  GenEvoChain,
  PokemonLocations,
  TypeEffectiveness,
  Items,
  Moves,
} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const resolvers = {
  Query: {
    /////////////// USER RESOLVERS ///////////////
    // get users
    users: async () => {
      return User.find();
    },

    // get user by id
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    /////////////// USER RESOLVERS ///////////////
    addUser: async (parent, args) => {
      try {
        const { firstName, lastName, username, email, password } = args;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        return { token, user };
      } catch (error) {
        console.log(error);

        return error;
      }
    },

    loginUser: async (parent, { username, password }) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          throw new Error("No user with that username");
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          throw new Error("Incorrect password");
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

// export resolvers
module.exports = resolvers;
