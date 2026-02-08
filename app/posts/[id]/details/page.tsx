"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostByIdRequest, deletePostRequest } from "@/store/posts/actions";

export default function PostDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const postId = Number(params.id);

  const { currentPost, loading, error } = useAppSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    if (!isNaN(postId)) {
      dispatch(fetchPostByIdRequest(postId));
    }
  }, [dispatch, postId]);

  function handleDelete() {
    const confirmDelete = confirm("Tem certeza que deseja excluir este post?");

    if (!confirmDelete) return;

    dispatch(deletePostRequest(postId));
    router.push("/posts");
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Carregando...</div>;
  }

  if (error || !currentPost) {
    return (
      <div className="p-6 text-red-500">{error ?? "Post não encontrado"}</div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/posts" className="text-blue-600 hover:underline text-sm">
        Voltar
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-2">{currentPost.title}</h1>

      <p className="text-gray-700 mb-6">{currentPost.body}</p>

      <div className="flex gap-3">
        <Link
          href={`/posts/${currentPost.id}/edit`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Editar
        </Link>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
