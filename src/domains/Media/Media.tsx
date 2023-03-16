import styled from 'styled-components'

import MediaProps from '../../interfaces/MediaProps'
import { colors } from '../../utils/colors'

import heart from '../../assets/heart.png'

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
`

const StyledVideo = styled.video`
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
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
}: MediaProps) => {
  return (
    <Container>
      {image ? (
        <StyledImg
          src={`../src/assets/medias/${photographerId}/${image}`}
          alt={title}
        />
      ) : (
        <StyledVideo src={`../src/assets/medias/${photographerId}/${video}`} />
      )}
      <WrapperTitleAndLikes>
        <p>{title}</p>
        <WrapperLikesAndHeart>
          <p>{likes}</p>
          <Heart src={heart} />
        </WrapperLikesAndHeart>
      </WrapperTitleAndLikes>
    </Container>
  )
}
