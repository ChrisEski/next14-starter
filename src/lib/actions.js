"use server";

import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/lib/auth";
const bcrypt = require("bcrypt");

export const addPost = async (formData) => {
  //   const title = formData.get("title");
  //   const desc = formData.get("desc");
  //   const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({ title, desc, slug, userId });

    await newPost.save();
    revalidatePath("/blog");
    console.log("Saved to DB");
  } catch (error) {
    console.log(error);
    return new Error("Something went wrong");
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    console.log("Deleted from db");
  } catch (error) {
    console.log(error);
    return new Error("Something went wrong");
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (formData) => {
  const { username, email, password, passwordRepeat, img } = Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return "Passwords do not match";
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return "User already exists";
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("New user saved to database");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
