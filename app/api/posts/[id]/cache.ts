const API_URL = "https://jsonplaceholder.typicode.com/posts";
import { Post } from "@/store/posts/types";

let postsCache: Post[] = [];

export async function loadPostsIfNeeded() {
  if (postsCache.length === 0) {
    const res = await fetch(API_URL);

    if (!res.ok) {
      if (!res.ok) {
        throw new Error("Erro ao buscar posts");
      }
    }

    postsCache = await res.json();
  }

  return postsCache;
}

export async function getPostsCache() {
  await loadPostsIfNeeded();
  return postsCache;
}

export function setPostsCache(posts: Post[]) {
  postsCache = posts;
}
