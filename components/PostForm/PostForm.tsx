"use client";

import { useState } from "react";
import { Post } from "@/types/posts";
import * as S from "./styles";

type PostFormData = {
  title: string;
  body: string;
  userId: number;
};

type PostFormProps = {
  initialData?: Post;
  onSubmit: (data: PostFormData) => void;
  loading?: boolean;
  error?: string | null;
};

export default function PostForm({
  initialData,
  onSubmit,
  loading,
  error,
}: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [body, setBody] = useState(initialData?.body ?? "");
  const [userId, setUserId] = useState<number>(initialData?.userId ?? 1);
  const [localError, setLocalError] = useState<string | null>(null);

  const isEditMode = Boolean(initialData?.id);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    if (!title || !body || !userId) {
      setLocalError("Todos os campos são obrigatórios");
      return;
    }

    onSubmit({
      title,
      body,
      userId,
    });
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">
        {isEditMode ? "Editar Post" : "Criar Post"}
      </h2>

      {(localError || error) && (
        <p className="text-red-500">{localError || error}</p>
      )}

      <S.Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <S.TextArea
        placeholder="Conteúdo"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <S.Input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />

      <S.Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </S.Button>
    </S.Form>
  );
}
