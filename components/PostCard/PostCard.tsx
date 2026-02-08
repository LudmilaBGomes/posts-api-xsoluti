"use client";

import { Post } from "@/types/posts";
import Link from "next/link";
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
        <Link
          href={`/posts/${post.id}/details`}
          className="text-sm font medium text-blue-600 hover:underline"
        >
          Ver detalhes
        </Link>
      </S.Footer>
    </S.Card>
  );
}
