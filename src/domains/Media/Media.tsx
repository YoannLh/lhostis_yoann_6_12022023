import styled from 'styled-components'

import MediaProps from '../../interfaces/MediaProps'
import { colors } from '../../utils/colors'

import heart from '../../assets/heart.png'
import { useState } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const StyledImg = styled.img`
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`

const StyledVideo = styled.video`
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`

const WrapperTitleAndLikes = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.primaryBackground};
`

const WrapperLikesAndHeart = styled.div`
  display: flex;
  width: 12%;
  align-items: center;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`

const Heart = styled.img`
  height: 17px;
`

export const Media = ({
  id,
  photographerId,
  title,
  image,
  video,
  likes,
  date,
  price,
  getClickedMediaId,
  clickAddLike,
}: MediaProps) => {
  const [newLikes, setNewLikes] = useState(likes)

  function addNewLikes(event?: React.KeyboardEvent) {
    if (event?.key === 'Tab') return
    setNewLikes(newLikes + 1)
    if (clickAddLike === undefined) return
    clickAddLike()
  }

  return (
    <>
      {getClickedMediaId ? (
        <Container>
          {image ? (
            <StyledImg
              src={`../src/assets/medias/${photographerId}/${image}`}
              alt={title}
              tabIndex={0}
              onClick={() => getClickedMediaId(id)}
              onKeyDown={(event) => getClickedMediaId(id, event)}
              aria-label="Ouvrir le media dans une lightbox"
            />
          ) : (
            <StyledVideo
              src={`../src/assets/medias/${photographerId}/${video}`}
              tabIndex={0}
              onClick={() => getClickedMediaId(id)}
              onKeyDown={(event) => getClickedMediaId(id, event)}
              aria-label="Ouvrir le media dans une lightbox"
            />
          )}
          <WrapperTitleAndLikes>
            <p>{title}</p>
            <WrapperLikesAndHeart
              tabIndex={0}
              aria-label="Bouton pour ajouter un like"
              onClick={() => addNewLikes()}
              onKeyDown={(event) => addNewLikes(event)}
            >
              <p>{newLikes}</p>
              <Heart src={heart} alt="likes" />
            </WrapperLikesAndHeart>
          </WrapperTitleAndLikes>
        </Container>
      ) : null}
    </>
  )
}
