import { useState } from 'react'
import styled from 'styled-components'

import { colors } from '../../utils/colors'
import arrow from '../../assets/whiteArrow.png'
import DropdownProps from '../../interfaces/DropdownProps'

const Container = styled.div`
  position: relative;
  display: flex;
  width: 47%;
  margin: auto 0;
  background: ${colors.primaryBackground};
  padding: 5px 20px;
  border-radius: 5px;
  font-weight: bold;
  color: ${colors.white};
  cursor: pointer;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 900px) {
    width: 30%;
  }
`

const Arrow = styled.img<{ isClicked: boolean }>`
  height: 10px;
  rotate: ${(props) => (props.isClicked ? '0deg' : '180deg')};
  z-index: 2;
`

const StyledDropdown = styled.nav<{ isClicked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: ${(props) => (props.isClicked ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 190px;
  background: ${colors.primaryBackground};
  border-radius: 5px;
  z-index: 1;
`

const Category = styled.p`
  margin: auto 20px;
`

const Line = styled.div`
  width: 85%;
  height: 1px;
  margin: 0 auto;
  background-color: ${colors.white};
`

export const Dropdown = ({ getActualCategoryInDropdown }: DropdownProps) => {
  const categories = ['Popularité', 'Date', 'Titre']
  const [actualCategory, setActualCategory] = useState(0)
  const [isClicked, setIsClicked] = useState(false)

  function handleClick() {
    setIsClicked(!isClicked)
  }

  function handleClickCategory(category: number) {
    getActualCategoryInDropdown(categories[category])
    setActualCategory(category)
    handleClick()
  }

  return (
    <Container>
      <p>{categories[actualCategory]}</p>
      <Arrow src={arrow} isClicked={isClicked} onClick={() => handleClick()} />
      <StyledDropdown isClicked={isClicked}>
        <Category onClick={() => handleClickCategory(0)}>
          {categories[0]}
        </Category>
        <Line />
        <Category onClick={() => handleClickCategory(1)}>
          {categories[1]}
        </Category>
        <Line />
        <Category onClick={() => handleClickCategory(2)}>
          {categories[2]}
        </Category>
      </StyledDropdown>
    </Container>
  )
}
