"use server";

import { Post } from "./models";
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";

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