import { NextResponse } from "next/server";
import {loadPostsIfNeeded, getPostsCache, setPostsCache} from "./[id]/cache";
import { Post } from "@/store/posts/types";
export async function GET() {
  try {
    const posts = await loadPostsIfNeeded();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = body.title;
    const content = body.body;
    const userId = body.userId;

    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    const posts = await getPostsCache();

    const newPost: Post = {
      id: Date.now(),
      title: title,
      body: content,
      userId: userId,
    };

    const updatedPosts = [newPost, ...posts];
    setPostsCache(updatedPosts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
