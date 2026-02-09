"use client";

import { useState } from "react";
import { Post } from  "@/store/posts/types";
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

export default function PostForm({initialData, onSubmit, loading, error}: PostFormProps) {
  
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
    <S.FormCard>
      <S.FormTitle>{isEditMode ? "Editar Post" : "Criar Post"}</S.FormTitle>

      {(localError || error) && (
        <S.ErrorMessage>{localError || error}</S.ErrorMessage>
      )}

      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <S.Label htmlFor="title">Título *</S.Label>
          <S.Input
            id="title"
            placeholder="Digite o título do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="body">Conteúdo *</S.Label>
          <S.TextArea
            id="body"
            placeholder="Digite o conteúdo do post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="userId">ID do Usuário *</S.Label>
          <S.Input
            id="userId"
            type="number"
            placeholder="Digite o ID do usuário"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          />
        </S.FormGroup>

        <S.ButtonGroup>
          <S.Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </S.Button>
        </S.ButtonGroup>
      </S.Form>
    </S.FormCard>
  );
}
