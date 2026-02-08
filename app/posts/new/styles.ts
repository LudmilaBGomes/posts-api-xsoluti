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
