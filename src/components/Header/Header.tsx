import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import logo from '../../assets/logo.png'
import { colors } from '../../utils/colors'

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 30px 60px;

  @media (max-width: 450px) {
    padding: 30px 20px;
  }
`

const Logo = styled.img`
  height: 35px;
`

const Title = styled.h1`
  font-size: 1.5em;
  color: ${colors.primaryText};
  margin: 0;
`

export const Header = () => {
  const location = useLocation()
  return (
    <Container>
      <Logo src={logo} alt="logo_fisheye" />
      {location.pathname === '/photographer' ? null : (
        <Title>Nos photographes</Title>
      )}
    </Container>
  )
}
