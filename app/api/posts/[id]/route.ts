import { NextResponse } from "next/server";
import { getPostsCache, setPostsCache, loadPostsIfNeeded } from "./cache";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request,  paramsObj: Params) {
  try {
    const param = await paramsObj.params;
    const postId = Number(param.id);
    const posts = await loadPostsIfNeeded();
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, paramsObj: Params) {
  try {
    const param = await paramsObj.params;
    const postId = Number(param.id);
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
    const postIndex = posts.findIndex((posts) => posts.id === postId);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Post não foi encontrado" },
        { status: 404 },
      );
    }

    posts[postIndex] = {
      id: postId,
      title: title,
      body: content,
      userId: userId,
    };

    setPostsCache(posts);
    return NextResponse.json(posts[postIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, paramsObj: Params) {
  try {
    const param = await paramsObj.params;
    const postId = Number(param.id);

    const posts = await getPostsCache();
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Post nãp encontrado" },
        { status: 404 },
      );
    }

    posts.splice(postIndex, 1);
    setPostsCache(posts);

    return NextResponse.json(
      { message: "Post deletado com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
