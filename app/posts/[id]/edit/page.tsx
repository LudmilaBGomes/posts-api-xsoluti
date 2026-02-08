"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import PostForm from "@/components/PostForm/PostForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostByIdRequest, updatePostRequest } from "@/store/posts/actions";
import * as S from "./styles";

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
    return <S.Loading>Carregando post...</S.Loading>;
  }

  if (error || !currentPost) {
    return (
      <S.Error>{error ?? "Post não encontrado"}</S.Error>
    );
  }

  return (
    <S.Container>
      <S.BackLink href="/posts">
        Voltar
      </S.BackLink>

      <S.Title>Editar post</S.Title>

      <PostForm
        initialData={currentPost}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </S.Container>
  );
}
