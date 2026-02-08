"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import PostForm from "@/components/PostForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostByIdRequest, updatePostRequest } from "@/store/posts/actions";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const postId = Number(params.id);

  const { currentPost, loading, error } = useAppSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    console.log("fething...", postId, loading, error);
    if (!isNaN(postId)) {
      dispatch(fetchPostByIdRequest(postId));
    }
  }, [dispatch, postId]);

  function handleSubmit(post: { title: string; body: string; userId: number }) {
    dispatch(updatePostRequest(postId, post));
    router.push("/posts");
  }

  if (loading && !currentPost) {
    return <div className="p-6 text-gray-500">Carregando post...</div>;
  }

  if (error || !currentPost) {
    return (
      <div className="p-6 text-red-500">{error ?? "Post não encontrado"}</div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/posts" className="text-blue-600 hover:underline text-sm">
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-6">Editar post</h1>

      <PostForm
        initialData={currentPost}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
