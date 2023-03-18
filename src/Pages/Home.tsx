import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import data from '../data/data.json'
import { colors } from '../utils/colors'
import { Header } from '../components/Header/Header'

const Container = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px 60px;

  @media (max-width: 450px) {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    padding: 30px 20px;
  }
`

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 30%;
  text-decoration: none;

  @media (max-width: 450px) {
    width: 100%;
  }
`

const Photo = styled.img`
  width: 150px;
  height: 150px;
  margin: auto;
  object-fit: cover;
  border-radius: 50%;
`

const Name = styled.p`
  text-align: center;
  font-size: 2em;
  margin: 0;
  color: ${colors.secondaryText};
`

const Town = styled.p`
  text-align: center;
  margin: 0;
  color: ${colors.primaryText};
`

const Quote = styled.p`
  text-align: center;
  font-size: 0.8em;
  margin: 0;
  color: ${colors.black};
`

const Price = styled.p`
  text-align: center;
  font-size: 0.8em;
  margin: 0 0 40px 0;
  color: ${colors.tertiaryText};
`

export const Home = () => {
  const [homeData, setHomeData] = useState(data.photographers)
  return (
    <>
      <Header />
      <Container>
        {homeData.map((photographer) => (
          <Card key={photographer.id} to={`photographer/${photographer.id}`}>
            <Photo
              src={`./src/assets/photographers/${photographer.portrait}`}
              alt="dfsf"
            />
            <Name>{photographer.name}</Name>
            <Town>
              {photographer.city}, {photographer.country}
            </Town>
            <Quote>{photographer.tagline}</Quote>
            <Price>{photographer.price}€/jour</Price>
          </Card>
        ))}
      </Container>
    </>
  )
}
