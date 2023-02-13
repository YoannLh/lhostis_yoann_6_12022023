import React from 'react'
import styled from 'styled-components'

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 30px 60px;
`

export const Header = () => {
  return (
    <Container>
      <div>logo</div>
      <p>Nos photographes</p>
    </Container>
  )
}
