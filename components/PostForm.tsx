'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Post } from '@/types/posts';

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

const Form = styled.form`
  @apply flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md;
`;

const Input = styled.input`
  @apply border border-gray-300 rounded px-3 py-2;
`;

const TextArea = styled.textarea`
  @apply border border-gray-300 rounded px-3 py-2 min-h-[120px];
`;

const Button = styled.button`
  @apply bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60;
`;

export default function PostForm({
  initialData,
  onSubmit,
  loading,
  error,
}: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [body, setBody] = useState(initialData?.body ?? '');
  const [userId, setUserId] = useState<number>(initialData?.userId ?? 1);
  const [localError, setLocalError] = useState<string | null>(null);

  const isEditMode = Boolean(initialData?.id);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    if (!title || !body || !userId) {
      setLocalError('Todos os campos são obrigatórios');
      return;
    }

    onSubmit({
      title,
      body,
      userId,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">
        {isEditMode ? 'Editar Post' : 'Criar Post'}
      </h2>

      {(localError || error) && (
        <p className="text-red-500">
          {localError || error}
        </p>
      )}

      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextArea
        placeholder="Conteúdo"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <Input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar'}
      </Button>
    </Form>
  );
}
