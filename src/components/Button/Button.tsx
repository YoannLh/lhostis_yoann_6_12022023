import styled from 'styled-components'

import { colors } from '../../utils/colors'
import ButtonProps from '../../interfaces/ButtonProps'

const Container = styled.button`
  margin: auto 0;
  background: ${colors.primaryBackground};
  padding: 20px;
  border-radius: 5px;
  font-weight: bold;
  color: ${colors.white};
  cursor: pointer;
  border: none;

  &:hover {
    background: ${colors.secondaryBackground};
    color: ${colors.black};
  }

  @media (max-width: 450px) {
    display: none;
  }
`

export const Button = ({ buttonText, isClicked }: ButtonProps) => {
  return (
    <Container onClick={isClicked ? () => isClicked() : () => {}}>
      {buttonText}
    </Container>
  )
}
