import styled from "styled-components";
import Link from "next/link";

export const Card = styled.article.attrs({
  className: `
    bg-white 
    rounded-xl 
    border border-gray-200 
    p-5 
    shadow-sm 
    hover:shadow-md 
    transition-shadow
  `,
})``;

export const Title = styled.h2.attrs({
  className: `
    text-lg 
    font-semibold 
    text-gray-800 
    mb-2
  `,
})``;

export const Body = styled.article.attrs({
  className: `
    text-gray-600 
    text-sm 
    mb-4 
    line 
    clamp-3
  `,
})``;

export const Footer = styled.article.attrs({
  className: `
    flex 
    justify-end
  `,
})``;

export const DetailLink = styled(Link).attrs({
  className: `
    text-sm 
    font-medium 
    text-blue-600 
    hover:underline
  `,
})``;
