"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import PostForm from "@/components/PostForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPostRequest } from "@/store/posts/actions";

export default function NewPostPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.posts);

  function handleSubmit(post: { title: string; body: string; userId: number }) {
    dispatch(createPostRequest(post));
    router.push("/posts");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/posts" className="text-blue-600 hover:underline text-sm">
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-6">Novo post</h1>

      <PostForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
