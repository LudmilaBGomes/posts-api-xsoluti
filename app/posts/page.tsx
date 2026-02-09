"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/services/postsApi";
import { Post } from "@/store/posts/types";
import { PostCard } from "@/components/PostCard/PostCard";
import * as S from "./styles";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Erro ao carregar posts");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <S.Loading>Carregando posts...</S.Loading>;
  }

  if (error) {
    return <S.Error>{error}</S.Error>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Post</S.Title>
        <S.NewPostLink href="/posts/new">
          Novo post
        </S.NewPostLink>
      </S.Header>

      <S.PostsList>
        {posts.map((post) => (
          <S.PostItem key={post.id}>
            <PostCard post={post} />
          </S.PostItem>
        ))}
      </S.PostsList>
    </S.Container>
  );
}
