import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'

import { colors } from '../../utils/colors'
import { Button } from '../Button/Button'
import ModalFormProps from '../../interfaces/ModalFormProps'
import whiteCross from '../../assets/whiteCross.png'
import ModalFormInputsProps from '../../interfaces/ModalFormInputsProps'

const Blur = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.4);
  z-index: 3;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: auto;
  padding: 30px;
  background: ${colors.secondaryBackground};
  border-radius: 5px;
  z-index: 3;
`

const Title = styled.p`
  font-size: 2.7em;
  margin: 0;
`

const Name = styled.p`
  font-size: 2.7em;
  margin: 0;
`

const Cross = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1.3em;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin: auto;
  padding-left: 15px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  margin: auto;
  padding: 15px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
`

const ErrorMessage = styled.p`
  font-size: 0.7em;
  margin: 0;
  color: white;
`

const WrapperButton = styled.div`
  display: flex;
  width: 40%;
  margin-top: 10px;
`

export const ModalForm = ({
  clickedContactMe,
  closeContactMe,
  name,
}: ModalFormProps) => {
  const [visible, setVisible] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ModalFormInputsProps>()
  const onSubmit: SubmitHandler<ModalFormInputsProps> = (data) => {
    console.log(data)
    setVisible(false)
  }
  const ref = useRef<HTMLDivElement>(null)

  function clickOnCross(event?: React.KeyboardEvent) {
    if (!event) {
      setVisible(!visible)
      if (closeContactMe) closeContactMe()
    }
    if (event?.key != 'Enter') return
    if (event?.key === 'Enter') {
      setVisible(!visible)
      if (closeContactMe) closeContactMe()
      return
    }
  }

  useEffect(() => {
    if (visible) ref.current?.focus()
  }, [visible])

  useEffect(() => {
    if (clickedContactMe) setVisible(!visible)
  }, [clickedContactMe])

  useEffect(() => {
    document.addEventListener('keydown', function listener(e) {
      if (e.key === 'Escape' && visible) {
        setVisible(!visible)
        if (closeContactMe) closeContactMe()
        document.removeEventListener('keydown', listener)
      }
    })
  })

  return (
    <Blur visible={visible}>
      <Container tabIndex={0} ref={ref}>
        <Title>Contactez-moi</Title>
        <Name>{name}</Name>
        <Cross
          src={whiteCross}
          onClick={() => clickOnCross()}
          onKeyDown={(event) => clickOnCross(event)}
          aria-label="Ferme le formulaire de contact"
          tabIndex={0}
          alt="croix fermeture"
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Prénom
            <Input
              type="text"
              {...register('firstName', {
                required: 'First name is required',
                pattern: {
                  value: /^[a-zç-é-è-ë-âA-ZÉ\-\']+$/,
                  message: 'This input is text only.',
                },
              })}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
          </Label>
          <Label>
            Nom
            <Input
              type="text"
              {...register('lastName', {
                required: 'Last name is required',
                pattern: {
                  value: /^[a-zç-é-è-ë-âA-ZÉ\-\']+$/,
                  message: 'This input is text only.',
                },
              })}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
          </Label>
          <Label>
            Email
            <Input
              type="text"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email format.',
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </Label>
          <Label>
            Votre message
            <Textarea
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && (
              <ErrorMessage>{errors.message.message}</ErrorMessage>
            )}
          </Label>
          <WrapperButton>
            <Button type="submit" buttonText="Envoyer" />
          </WrapperButton>
        </Form>
      </Container>
    </Blur>
  )
}
