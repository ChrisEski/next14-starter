import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error("Wrong credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

    if (isPasswordCorrect) {
      throw new Error("Wrong credentials");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("***************************");
      // console.log("User:", user);
      // console.log("***************************");
      // console.log("Account:", account);
      // console.log("***************************");
      // console.log("Profile:", profile);
      // console.log("***************************");

      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.name,
              email: profile.email,
              img: profile.avatar_url,
            });

            await newUser.save();
            console.log("Account created successfully");
          }
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      }
    },
  },
});
