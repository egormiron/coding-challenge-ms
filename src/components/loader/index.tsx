import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: calc(50% - 0.75rem);
  right: calc(50% - 50px);
`;

const H2 = styled.h2`
  text-align: center;
`;

export default function Loader() {
  return (
    <Container>
      <H2>Loading...</H2>
    </Container>
  );
}
