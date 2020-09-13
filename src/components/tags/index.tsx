import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;

const Tag = styled.div`
  background: #b9b4b0;
  color: white;
  padding: 0.25rem;
  margin: 0 0.25rem 0.25rem 0;
`;

export default function Tags({ items }) {
  if (!items || !items.length) {
    return null;
  }

  return (
    <Container>
      {items.map((item, index) => (
        <Tag key={index}>{item}</Tag>
      ))}
    </Container>
  );
}
