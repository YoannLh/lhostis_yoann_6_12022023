import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { colors } from '../../utils/colors'
import cross from '../../assets/cross.png'
import redArrow from '../../assets/redArrow.png'
import MediaProps from '../../interfaces/MediaProps'
import ModalProps from '../../interfaces/ModalProps'

const Container = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  width: 100%;
  height: 100vh;
  background: ${colors.white};
  z-index: 3;
`

const WrapperMediaAndControls = styled.div`
  position: relative;
  display: flex;
  width: 85%;
  height: 90%;
  margin: auto;

  @media (max-width: 450px) {
    width: 100%;
  }
`

const WrapperLeftArrow = styled.div`
  display: flex;
  width: 5%;
  height: 100%;

  @media (max-width: 450px) {
    width: 10%;
  }
`

const LeftArrow = styled.img`
  height: 20px;
  margin: auto;
  &: hover {
    cursor: pointer;
  }

  @media (max-width: 450px) {
    height: 30px;
  }
`

const Photo = styled.img`
  width: 80%;
  height: 100%;
  margin: auto;
  object-fit: scale-down;
`

const Video = styled.video`
  width: 80%;
  height: 100%;
  margin: auto;
`

const Cross = styled.img`
  position: absolute;
  top: 5px;
  right: 20px;
  height: 20px;
  &: hover {
    cursor: pointer;
  }

  @media (max-width: 450px) {
    top: -20px;
    right: 10px;
    height: 30px;
  }
`

const WrapperRighttArrow = styled.div`
  display: flex;
  width: 5%;
  height: 100%;

  @media (max-width: 450px) {
    width: 10%;
  }
`

const RighttArrow = styled.img`
  height: 20px;
  margin: auto;
  rotate: 180deg;
  &: hover {
    cursor: pointer;
  }

  @media (max-width: 450px) {
    height: 30px;
  }
`

export const Modal = ({
  clickedMediaId,
  medias,
  deleteClickedMediaIdWhenCloseModal,
}: ModalProps) => {
  const [visible, setVisible] = useState(false)
  const [actualIndex, setActualIndex] = useState<number>()
  const [actualMedia, setActualMedia] = useState<MediaProps>()
  useEffect(() => {
    if (clickedMediaId === undefined) return
    setVisible(true)
    if (medias === undefined) return
    for (const media of medias) {
      if (clickedMediaId === media.id) {
        setActualMedia(media)
        setActualIndex(medias.indexOf(media))
        return
      }
    }
  }, [clickedMediaId, medias])

  function displayPreviousMedia() {
    if (actualIndex === undefined) return
    setActualIndex(actualIndex - 1)
    if (medias === undefined) return
    setActualMedia(medias[actualIndex - 1])
  }

  function displayNextMedia() {
    if (actualIndex === undefined) return
    setActualIndex(actualIndex + 1)
    if (medias === undefined) return
    setActualMedia(medias[actualIndex + 1])
  }

  function closeModal() {
    setVisible(false)
    deleteClickedMediaIdWhenCloseModal()
    window.scrollTo(0, 0)
  }

  return (
    <Container visible={visible}>
      <WrapperMediaAndControls>
        <WrapperLeftArrow>
          {actualIndex === 0 ? null : (
            <LeftArrow
              src={redArrow}
              alt=""
              onClick={() => displayPreviousMedia()}
            />
          )}
        </WrapperLeftArrow>
        {actualMedia && actualMedia.image ? (
          <Photo
            src={`../src/assets/medias/${actualMedia.photographerId}/${actualMedia.image}`}
            alt=""
          />
        ) : null}
        {actualMedia && actualMedia.video ? (
          <Video
            src={`../src/assets/medias/${actualMedia.photographerId}/${actualMedia.video}`}
            controls
          />
        ) : null}
        <Cross src={cross} alt="" onClick={() => closeModal()} />
        <WrapperRighttArrow>
          {medias && actualIndex === +medias.length - 1 ? null : (
            <RighttArrow
              src={redArrow}
              alt=""
              onClick={() => displayNextMedia()}
            />
          )}
        </WrapperRighttArrow>
      </WrapperMediaAndControls>
    </Container>
  )
}
