import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div.attrs({
  className: `
    p-6 
    max-w-2xl 
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
    mb-6
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
