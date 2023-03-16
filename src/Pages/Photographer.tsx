import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import data from '../data/data.json'
import PhotographerProps from '../interfaces/PhotographerProps'
import { colors } from '../utils/colors'
import { Dropdown } from '../components/Dropdown/Dropdown'
import { MediaFactory } from '../domains/Factory/MediaFactory'
import MediaProps from '../interfaces/MediaProps'
import { Media } from '../domains/Media/Media'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 30px 60px;

  @media (max-width: 450px) {
    padding: 30px 20px;
  }
`

const HeaderPhotographer = styled.section`
  display: flex;
  height: 170px;
  justify-content: space-between;
  background: ${colors.tertiaryBackground};
  padding: 40px;

  @media (max-width: 450px) {
    height: 130px;
  }
`

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
  margin: auto 0;
`

const Name = styled.p`
  font-size: 2em;
  margin: 0;
  color: ${colors.secondaryText};
`

const Town = styled.p`
  margin: 0;
  color: ${colors.primaryText};
`

const Quote = styled.p`
  font-size: 0.8em;
  margin: 0;
  color: ${colors.black};
`

const Button = styled.div`
  margin: auto 0;
  background: ${colors.primaryBackground};
  padding: 20px;
  border-radius: 5px;
  font-weight: bold;
  color: ${colors.white};
  cursor: pointer;

  &:hover {
    background: ${colors.secondaryBackground};
    color: ${colors.black};
  }

  @media (max-width: 450px) {
    display: none;
  }
`

const Photo = styled.img`
  width: 150px;
  height: 150px;
  margin: auto 0;
  object-fit: cover;
  border-radius: 50%;

  @media (max-width: 450px) {
    width: 100px;
    height: 100px;
  }
`

const WrapperSortAndDropdown = styled.div`
  position: relative;
  top: 20px;
  display: flex;
  width: 17%;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
  }
`

const WrapperMedias = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;

  @media (max-width: 900px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`

export const Photographer = () => {
  const { id } = useParams()
  const [infos, setInfos] = useState<PhotographerProps>()
  const [medias, setMedias] = useState<MediaProps[]>()
  useEffect(() => {
    if (data === undefined) return
    for (const photographer of data.photographers) {
      if (id && +id === photographer.id) {
        setInfos(photographer)
        return
      }
    }
  }, [data])
  useEffect(() => {
    if (id === undefined) return
    let temp = []
    for (const media of data.medias) {
      if (+id === media.photographerId) {
        temp.push(media)
      }
    }
    setMedias(temp)
  }, [id])
  return (
    <Container>
      {infos ? (
        <HeaderPhotographer>
          <Infos>
            <Name>{infos.name}</Name>
            <Town>
              {infos.city}, {infos.country}
            </Town>
            <Quote>{infos.tagline}</Quote>
          </Infos>
          <Button>Contactez-moi</Button>
          <Photo
            src={`../src/assets/photographers/${infos.portrait}`}
            alt="sfdfsdd"
          />
        </HeaderPhotographer>
      ) : null}
      <WrapperSortAndDropdown>
        <p>Trier par</p>
        <Dropdown />
      </WrapperSortAndDropdown>
      <WrapperMedias>
        {medias
          ? medias.map((media) => {
              return <MediaFactory key={media.id} media={media} />
            })
          : null}
      </WrapperMedias>
    </Container>
  )
}
