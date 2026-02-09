import { Post } from "@/store/posts/types";
import { get, post as postRequest, put, del } from "./httpClient";

export async function getPosts(): Promise<Post[]> {
  return get<Post[]>("");
}

export async function getPostsById(id: number): Promise<Post> {
  return get<Post>(`/${id}`);
}

export async function createPost(post: Omit<Post, "id">): Promise<Post> {
  return postRequest<Post>("", post);
}

export async function updatePost(id: number,  post: Omit<Post, "id">): Promise<Post> {
  return put<Post>(`/${id}`, post);
}

export async function deletePost(id: number): Promise<void> {
  await del<void>(`/${id}`);
}
