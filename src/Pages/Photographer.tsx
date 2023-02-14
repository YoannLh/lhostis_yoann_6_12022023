import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  padding: 30px 60px;

  @media (max-width: 450px) {
    padding: 30px 20px;
  }
`

export const Photographer = () => {
  return <Container>photographer</Container>
}
