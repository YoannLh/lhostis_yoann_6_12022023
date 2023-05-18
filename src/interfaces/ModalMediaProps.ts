import MediaProps from './MediaProps'

export default interface ModalMediasProps {
  clickedMediaId: number | undefined
  medias: MediaProps[] | undefined
  deleteClickedMediaIdWhenCloseModal: () => void
}
