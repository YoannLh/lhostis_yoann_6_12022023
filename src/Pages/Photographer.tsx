import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import data from '../data/data.json'
import PhotographerProps from '../interfaces/PhotographerProps'
import { colors } from '../utils/colors'
import { Dropdown } from '../components/Dropdown/Dropdown'
import { MediaFactory } from '../domains/Factory/MediaFactory'
import MediaProps from '../interfaces/MediaProps'
import { Header } from '../components/Header/Header'
import { ModalMedia } from '../components/Modals/ModalMedia'
import blackHeart from '../assets/blackHeart.png'
import { ModalForm } from '../components/Modals/ModalForm'
import { Button } from '../components/Button/Button'

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

const WrapperTotalLikesAndPrice = styled.div`
  position: fixed;
  bottom: 0;
  right: 25px;
  display: flex;
  width: 25%;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  background: ${colors.secondaryBackground};
  color: ${colors.black};
  border-radius: 5px 5px 0 0;

  @media (max-width: 900px) {
    width: 90%;
  }
`

const TotalLikes = styled.p`
  margin: auto;
`

const Heart = styled.img`
  height: 12px;
`

const Price = styled.p`
  margin: auto;
`

export const Photographer = () => {
  const { id } = useParams()
  const [infos, setInfos] = useState<PhotographerProps>()
  const [medias, setMedias] = useState<MediaProps[]>()
  const [clickedContactMe, setClickedContactMe] = useState(false)
  const [clickedMediaId, setClickedMediaId] = useState<number>()
  const [totalLikes, setTotalLikes] = useState(0)
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
    let tempMedias = []
    let tempLikes = 0
    for (const media of data.medias) {
      if (+id === media.photographerId) {
        tempMedias.push(media)
        tempLikes += media.likes
      }
    }
    setMedias(tempMedias)
    setTotalLikes(tempLikes)
  }, [id])

  function clickContactMe() {
    setClickedContactMe(!clickedContactMe)
  }

  function closeContactMe() {
    setClickedContactMe(!clickedContactMe)
  }

  function getActualCategoryInDropdown(category: string) {
    if (medias === undefined) return
    const temp = [...medias]
    switch (category) {
      case 'Popularité':
        temp.sort((a, b) => b.likes - a.likes)
        setMedias(temp)
        break
      case 'Date':
        temp.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        setMedias(temp)
        break
      case 'Titre':
        temp.sort((a, b) => {
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
          return 0
        })
        setMedias(temp)
        break
      default:
        break
    }
  }

  function getClickedMediaId(
    clickedMediaId: number,
    event?: React.KeyboardEvent
  ) {
    if (event?.key === 'Tab') return
    if (clickedMediaId) setClickedMediaId(clickedMediaId)
  }

  function deleteClickedMediaIdWhenCloseModal() {
    setClickedMediaId(undefined)
  }

  function clickAddLike() {
    setTotalLikes(totalLikes + 1)
  }

  return (
    <>
      <Header />
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
            <Button
              isClicked={() => clickContactMe()}
              buttonText="Contactez-moi"
              aria-label="Bouton pour ouvrir le formulaire de contact"
            />
            <Photo
              src={`../src/assets/photographers/${infos.portrait}`}
              alt={infos.name}
            />
          </HeaderPhotographer>
        ) : null}
        <WrapperSortAndDropdown>
          <p>Trier par</p>
          <Dropdown getActualCategoryInDropdown={getActualCategoryInDropdown} />
        </WrapperSortAndDropdown>
        <WrapperMedias>
          {medias
            ? medias.map((media) => {
                return (
                  <MediaFactory
                    key={media.id}
                    media={media}
                    getClickedMediaId={getClickedMediaId}
                    clickAddLike={clickAddLike}
                  />
                )
              })
            : null}
        </WrapperMedias>
        <ModalMedia
          clickedMediaId={clickedMediaId}
          medias={medias}
          deleteClickedMediaIdWhenCloseModal={
            deleteClickedMediaIdWhenCloseModal
          }
        />
        <ModalForm
          clickedContactMe={clickedContactMe}
          closeContactMe={closeContactMe}
          name={infos?.name}
        />
        <WrapperTotalLikesAndPrice>
          <TotalLikes>
            {totalLikes} <Heart src={blackHeart} />
          </TotalLikes>
          <Price>{infos?.price} € / jour</Price>
        </WrapperTotalLikesAndPrice>
      </Container>
    </>
  )
}
