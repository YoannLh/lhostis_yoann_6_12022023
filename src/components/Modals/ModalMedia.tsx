import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { colors } from '../../utils/colors'
import cross from '../../assets/cross.png'
import redArrow from '../../assets/redArrow.png'
import MediaProps from '../../interfaces/MediaProps'
import ModalMediaProps from '../../interfaces/ModalMediaProps'

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
  z-index: 3;

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
  height: 30px;
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
  right: 30px;
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
  height: 30px;
  margin: auto;
  rotate: 180deg;
  &: hover {
    cursor: pointer;
  }

  @media (max-width: 450px) {
    height: 30px;
  }
`

const WrapperPhotoVideoAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Title = styled.p`
  position: relative;
  left: 10%;
  margin: 0;
  color: ${colors.primaryText};
`

export const ModalMedia = ({
  clickedMediaId,
  medias,
  deleteClickedMediaIdWhenCloseModal,
}: ModalMediaProps) => {
  const [visible, setVisible] = useState(false)
  const [actualIndex, setActualIndex] = useState<number>()
  const [actualMedia, setActualMedia] = useState<MediaProps>()
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (ref === undefined) return
    ref.current?.focus()
  }, [])

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
  }, [clickedMediaId])

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

  useEffect(() => {
    document.addEventListener('keydown', function listener(e) {
      if (e.key === 'ArrowLeft') {
        if (actualIndex === 0) return
        displayPreviousMedia()
        document.removeEventListener('keydown', listener)
      }
      if (e.key === 'ArrowRight') {
        if (medias && actualIndex === medias.length - 1) return
        displayNextMedia()
        document.removeEventListener('keydown', listener)
      }
      if (e.key === 'Escape') {
        closeModal()
        document.removeEventListener('keydown', listener)
      }
    })
  })
  return (
    <Container visible={visible} tabIndex={0}>
      <WrapperMediaAndControls tabIndex={0}>
        <WrapperLeftArrow tabIndex={0}>
          {actualIndex === 0 ? null : (
            <LeftArrow
              src={redArrow}
              onClick={() => displayPreviousMedia()}
              alt="Image précédente"
            />
          )}
        </WrapperLeftArrow>
        {actualMedia && actualMedia.image ? (
          <WrapperPhotoVideoAndTitle tabIndex={0}>
            <Photo
              src={`../src/assets/medias/${actualMedia.photographerId}/${actualMedia.image}`}
              alt={actualMedia.title}
            />
            <Title>{actualMedia?.title}</Title>
          </WrapperPhotoVideoAndTitle>
        ) : null}
        {actualMedia && actualMedia.video ? (
          <WrapperPhotoVideoAndTitle>
            <Video
              src={`../src/assets/medias/${actualMedia.photographerId}/${actualMedia.video}`}
              aria-labelledby={actualMedia.video}
              controls
              tabIndex={0}
            />
            <Title>{actualMedia?.title}</Title>
          </WrapperPhotoVideoAndTitle>
        ) : null}
        <Cross
          src={cross}
          onClick={() => closeModal()}
          onKeyDown={closeModal}
          tabIndex={0}
          alt="croix fermeture"
        />
        <WrapperRighttArrow tabIndex={0}>
          {medias &&
          actualIndex &&
          actualIndex === +medias.length - 1 ? null : (
            <RighttArrow
              src={redArrow}
              onClick={() => displayNextMedia()}
              alt="Image suivante"
            />
          )}
        </WrapperRighttArrow>
      </WrapperMediaAndControls>
    </Container>
  )
}
