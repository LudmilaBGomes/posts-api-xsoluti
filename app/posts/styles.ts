import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div.attrs({
  className: `
    p-6 
    max-w-4xl 
    mx-auto
  `,
})``;

export const Header = styled.div.attrs({
  className: `
    flex 
    items-center 
    justify-between 
    mb-6
  `,
})``;

export const Title = styled.h1.attrs({
  className: `
    text-2xl 
    font-bold
  `,
})``;

export const NewPostLink = styled(Link).attrs({
  className: `
    bg-blue-600 
    text-white 
    px-4 
    py-2 
    rounded 
    hover:bg-blue-700 
    transition
  `,
})``;

export const PostsList = styled.ul.attrs({
  className: `
    space-y-4
  `,
})``;

export const PostItem = styled.li``;

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
