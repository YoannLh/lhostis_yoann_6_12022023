import { Media } from '../Media/Media'
import MediaFactoryProps from '../../interfaces/MediaFactoryProps'

export const MediaFactory = ({ media }: MediaFactoryProps) => {
  if (media.image) {
    return (
      <Media
        id={media.id}
        photographerId={media.photographerId}
        title={media.title}
        image={media.image}
        likes={media.likes}
        date={media.date}
        price={media.price}
      />
    )
  }
  if (media.video) {
    return (
      <Media
        id={media.id}
        photographerId={media.photographerId}
        title={media.title}
        video={media.video}
        likes={media.likes}
        date={media.date}
        price={media.price}
      />
    )
  } else {
    return null
  }
}
