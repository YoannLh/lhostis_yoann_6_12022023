import MediaProps from './MediaProps'

export default interface ModalProps {
  clickedMediaId: number | undefined
  medias: MediaProps[] | undefined
  deleteClickedMediaIdWhenCloseModal: () => void
}
