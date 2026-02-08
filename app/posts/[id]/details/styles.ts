import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div.attrs({
  className: `
    p-6 
    max-w-3xl 
    mx-auto
  `,
})``;

export const BackLink = styled(Link).attrs({
  className: `
    text-blue-600 
    hover:underline 
    text-sm
  `,
})``;

export const Title = styled.h1.attrs({
  className: `
    text-2xl 
    font-bold 
    mt-4 
    mb-2
  `,
})``;

export const Body = styled.p.attrs({
  className: `
    text-gray-700 
    mb-6
  `,
})``;

export const Actions = styled.div.attrs({
  className: `
    flex 
    gap-3
  `,
})``;

export const EditLink = styled(Link).attrs({
  className: `
    px-4 
    py-2 
    bg-yellow-500 
    text-white 
    rounded 
    hover:bg-yellow-600 
    transition
  `,
})``;

export const DeleteButton = styled.button.attrs({
  className: `
    px-4 
    py-2 
    bg-red-600 
    text-white 
    rounded 
    hover:bg-red-700 
    transition
  `,
})``;

export const Loading = styled.div.attrs({
  className: `
    p-6 
    text-gray-500
  `,
})``;

export const Error = styled.div.attrs({
  className: `
    p-6 
    text-red-500
  `,
})``;
