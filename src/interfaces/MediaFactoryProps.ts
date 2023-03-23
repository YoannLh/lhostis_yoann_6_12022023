import MediaProps from './MediaProps'

export default interface MediaFactoryProps {
  media: MediaProps
  getClickedMediaId?: (id: number) => void
}
