"use client";

import styled from "styled-components";
import { Post } from "@/types/posts";
import Link from "next/link";

type Props = {
  post: Post;
};

const Card = styled.article`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  @apply text-lg font-semibold text-gray-800 mb-2;
`;

const Body = styled.p`
  @apply text-gray-600 text-sm mb-4 line clamp-3;
`;

const Footer = styled.footer`
  @apply flex justify-end;
`;

export function PostCard({ post }: Props) {
  return (
    <Card>
      <Title>{post.title}</Title>
      <Body>{post.body}</Body>

      <Footer>
        <Link
          href={`/posts/${post.id}/details`}
          className="text-sm font medium text-blue-600 hover:underline"
        >
          Ver detalhes →
        </Link>
      </Footer>
    </Card>
  );
}
