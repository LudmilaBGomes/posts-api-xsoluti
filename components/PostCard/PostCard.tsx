"use client";

import { Post } from "@/store/posts/types";
import * as S from "./styles";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  return (
    <S.Card>
      <S.Title>{post.title}</S.Title>
      <S.Body>{post.body}</S.Body>

      <S.Footer>
        <S.DetailLink href={`/posts/${post.id}/details`}>
          Ver detalhes
        </S.DetailLink>
      </S.Footer>
    </S.Card>
  );
}
