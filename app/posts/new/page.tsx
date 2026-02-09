"use client";

import { useRouter } from "next/navigation";

import PostForm from "@/components/PostForm/PostForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPostRequest } from "@/store/posts/actions";
import * as S from "./styles";

export default function NewPostPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const postsState = useAppSelector((state) => state.posts);
  const loading = postsState.loading;
  const error = postsState.error;


  function handleSubmit(post: { title: string; body: string; userId: number }) {
    dispatch(createPostRequest(post));
    router.push("/posts");
  }

  return (
    <S.Container>
      <S.BackLink href="/posts">
        Voltar
      </S.BackLink>

      <PostForm onSubmit={handleSubmit} loading={loading} error={error} />
    </S.Container>
  );
}
