import styled from "styled-components";

export const FormCard = styled.div.attrs({
  className: `
    bg-white 
    rounded-xl 
    border border-gray-200 
    p-8 
    shadow-sm
  `,
})``;

export const Form = styled.form`
  @apply flex flex-col gap-6;
`;

export const FormTitle = styled.h2.attrs({
  className: `
    text-2xl 
    font-bold 
    text-gray-800 
    mb-2
  `,
})``;

export const ErrorMessage = styled.p.attrs({
  className: `
    text-red-500 
    bg-red-50 
    border border-red-200 
    rounded 
    p-3 
    mb-4
  `,
})``;

export const FormGroup = styled.div.attrs({
  className: `
    flex 
    flex-col 
    gap-2
  `,
})``;

export const Label = styled.label.attrs({
  className: `
    text-sm 
    font-medium 
    text-gray-700
  `,
})``;

export const Input = styled.input`
  @apply border border-gray-300 rounded px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition;
`;

export const TextArea = styled.textarea`
  @apply border border-gray-300 rounded px-4 py-2 text-gray-900 placeholder-gray-400 min-h-[150px] resize-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition;
`;

export const ButtonGroup = styled.div.attrs({
  className: `
    flex 
    gap-3 
    pt-4 
    border-t 
    border-gray-200 
    mt-6
  `,
})``;

export const Button = styled.button.attrs({
  className: `
    flex-1 
    bg-blue-600 
    text-white 
    font-medium
    py-2.5 
    rounded 
    hover:bg-blue-700 
    transition 
    disabled:opacity-60
  `,
})``;

export const CancelButton = styled.button.attrs({
  className: `
    flex-1 
    border 
    border-gray-300 
    text-gray-700 
    font-medium
    py-2.5 
    rounded 
    hover:bg-gray-50 
    transition
  `,
})``;
