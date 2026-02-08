import styled from "styled-components";

export const Form = styled.form`
  @apply flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md;
`;

export const Input = styled.input`
  @apply border border-gray-300 rounded px-3 py-2;
`;

export const TextArea = styled.textarea`
  @apply border border-gray-300 rounded px-3 py-2 min-h-[120px];
`;

export const Button = styled.button`
  @apply bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60;
`;
