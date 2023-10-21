export default interface MediaProps {
  id: number
  photographerId: number
  title: string
  image?: string
  video?: string
  likes: number
  date: string
  price: number
  getClickedMediaId?: (id: number, event?: React.KeyboardEvent) => void
  clickAddLike?: () => void
}
