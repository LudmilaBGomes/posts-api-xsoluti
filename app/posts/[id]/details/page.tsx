"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostByIdRequest, deletePostRequest } from "@/store/posts/actions";
import * as S from "./styles";

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
    return <S.Loading>Carregando...</S.Loading>;
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

      <S.Title>{currentPost.title}</S.Title>

      <S.Body>{currentPost.body}</S.Body>

      <S.Actions>
        <S.EditLink href={`/posts/${currentPost.id}/edit`}>
          Editar
        </S.EditLink>

        <S.DeleteButton onClick={handleDelete}>
          Excluir
        </S.DeleteButton>
      </S.Actions>
    </S.Container>
  );
}
