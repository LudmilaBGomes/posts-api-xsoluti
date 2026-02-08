import { NextResponse } from "next/server";
import {
  loadPostsIfNeeded,
  getPostsCache,
  setPostsCache,
  Post,
} from "./[id]/cache";

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
    const { title, body: content, userId } = body;

    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    const posts = await getPostsCache();

    const newPost: Post = {
      id: Date.now(),
      title,
      body: content,
      userId,
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
