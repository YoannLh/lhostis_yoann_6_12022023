import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'

import logo from '../../assets/logo.png'
import { colors } from '../../utils/colors'
import { useEffect, useState } from 'react'

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 30px 60px;

  @media (max-width: 450px) {
    padding: 30px 20px;
  }
`

const LinkLogo = styled(Link)``

const Logo = styled.img`
  height: 35px;
`

const Title = styled.h1`
  font-size: 1.5em;
  color: ${colors.primaryText};
  margin: 0;
`

export const Header = () => {
  let { id } = useParams()
  return (
    <Container>
      <LinkLogo to="/">
        <Logo src={logo} alt="logo_fisheye" />
      </LinkLogo>
      {id ? null : <Title>Nos photographes</Title>}
    </Container>
  )
}
