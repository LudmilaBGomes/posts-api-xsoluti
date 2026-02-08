import styled from "styled-components";

export const Card = styled.article`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h2`
  @apply text-lg font-semibold text-gray-800 mb-2;
`;

export const Body = styled.p`
  @apply text-gray-600 text-sm mb-4 line clamp-3;
`;

export const Footer = styled.footer`
  @apply flex justify-end;
`;
