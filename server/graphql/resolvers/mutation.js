const User = require("../../models/User");
const authorize = require("../../middlewares/Authorize");
const { AuthenticationError } = require("apollo-server-express");
const userOwnership = require("../../middlewares/userOwnership");
const Post = require("../../models/Post");
const Category = require("../../models/Category");

module.exports = {
  Mutation: {
    loginUser: async (parent, args, context, info) => {
      try {
        const user = await User.findOne({ email: args.fields.email });
        // Check if the user exists in the database
        if (!user) {
          throw new AuthenticationError("User does not exist!");
        }

        // Compare password
        const passwordCheck = await user.matchPassword(args.fields.password);

        // Throw error if password doesn't match
        if (!passwordCheck) {
          throw new AuthenticationError("Wrong Password!");
        }

        const token = await user.getSignedJwtToken();
        if (!token) {
          throw new AuthenticationError("Couldnt get the token, try again!");
        }

        return {
          _id: user._id,
          email: user.email,
          token: token,
        };
      } catch (err) {
        throw err;
      }
    },
    signUp: async (parent, args, context, info) => {
      try {
        const user = await User.create({
          email: args.fields.email,
          password: args.fields.password,
        });

        const token = user.getSignedJwtToken();

        if (!token) {
          throw new AuthenticationError("Couldnt get token, try again");
        } else {
          const result = await user.save();

          return { ...result._doc };
        }
      } catch (err) {
        if (err.code === 11000) {
          throw new AuthenticationError("Duplicate Entry, user already exits!");
        }
        throw err;
      }
    },
    updateUserProfile: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);

        // Check ownership of the user
        if (!userOwnership(req, args.id)) {
          throw new AuthenticationError("You dont own this user");
        }

        if (args.name.length < 2) {
          throw new AuthenticationError(
            "Name cannot be empty or less than 2 characters!"
          );
        }

        if (args.lastname.length < 2) {
          throw new AuthenticationError(
            "Lastname cannot be empty or less than 3 characters!"
          );
        }

        // update the user
        const user = await User.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            lastname: args.lastname,
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return user;
      } catch (err) {
        throw err;
      }
    },
    updateUserEmailPass: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);

        // Check ownership of the user
        if (!userOwnership(req, args.id)) {
          throw new AuthenticationError("You dont own this user");
        }

        // Validate fields
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(args.email).toLowerCase()) === false) {
          throw new AuthenticationError(
            "Email is not valid! Check your email."
          );
        }

        // Update user
        const user = await User.findById(args.id);

        user.email = args.email;
        if (args.password) {
          user.password = args.password;
        }

        const token = await user.getSignedJwtToken();
        if (!token) {
          throw new AuthenticationError("Couldnt get the token, try again!");
        }
        await user.save();

        return user;
      } catch (err) {
        throw err;
      }
    },
    createPost: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);

        // Validate fields

        for (let key in args.fields) {
          if (key.length < 2) {
            throw new AuthenticationError(
              `${key} cannot be empty or less than 2 characters!`
            );
          }
        }

        const post = await Post.create({
          title: args.fields.title,
          excerpt: args.fields.excerpt,
          content: args.fields.content,
          author: req._id,
          status: args.fields.status,
          category: args.fields.category,
        });

        await post.save();

        return post;
      } catch (err) {
        throw err;
      }
    },
    createCategory: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);

        const category = await Category.create({
          name: args.name,
          author: req._id,
        });

        await category.save();

        return category;
      } catch (err) {
        throw err;
      }
    },
    updatePost: async (parent, { fields, postId }, context, info) => {
      try {
        const req = authorize(context.req);
        const post = await Post.findById(postId);

        if (!userOwnership(req, post.author))
          throw new AuthenticationError("Unauthorized, sorry");

        for (key in fields) {
          if (post[key] !== fields[key]) {
            post[key] = fields[key];
          }
        }

        await post.save();

        return post;
      } catch (err) {
        throw err;
      }
    },
    deletePost: async (parent, { id }, context, info) => {
      try {
        const req = authorize(context.req);
        const post = await Post.findById(id);

        if (!userOwnership(req, post.author))
          throw new AuthenticationError("Unauthorized, sorry");
        await Post.findByIdAndDelete(id);

        return "Post deleted!";
      } catch (err) {
        throw err;
      }
    },
    updateCategory: async (parent, { catId, name }, context, info) => {
      try {
        const req = authorize(context.req);

        let category = await Category.findById(catId);
        if (!userOwnership(req, category.author))
          throw new AuthenticationError("Unauthorized, sorry");
        category = await Category.findByIdAndUpdate(
          catId,
          {
            name,
          },
          { new: true }
        );

        return category;
      } catch (err) {
        throw err;
      }
    },
    deleteCategory: async (parent, { catId }, context, info) => {
      try {
        const req = authorize(context.req);

        let category = await Category.findById(catId);
        if (!userOwnership(req, category.author))
        throw new AuthenticationError("Unauthorized, sorry");
        category = await Category.findByIdAndDelete(catId);


        return 'Category removed !'

      } catch (err) {
        throw err;
      }
    },
  },
};
