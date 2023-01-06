import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'
import Text from 'components/Text'
import Button from 'components/Button'
import Icon from 'components/Icon'

const Block = styled(Text)`
  border: 1px solid var(--color-primary-800);
  flex: 1;
  padding: 24px;
  margin: 0 7px;
  overflow: hidden;
  min-height: 300px;
  transition: var(--transition-fast);

  &:hover {
    opacity: 1;
    box-shadow: 0 2px 14px 1px rgba(0, 0, 0, 0.13);
  }
`

const Articles = styled.div`
  box-sizing: border-box;
  width: 275px;
  height: 275px;
  max-width:275px;
  max-height: 275px;
  border: 1px solid var(--color-primary-800);
  transition: var(--transition-fast);
  margin-bottom: 2rem;

  &:hover {
    opacity: 1;
    box-shadow: 0 2px 14px 1px rgba(0, 0, 0, 0.13);
  }

  
`

const CSBlock = styled(Block)`
  border: solid 2px #0477f4;
  box-shadow: 0 2px 464px 9px rgba(4, 119, 244, 0.17), 0 4px 11px 1px rgba(4, 119, 244, 0.27);
  background-image: url('/logo.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-position-y: 60%;
  opacity: 1;

  &:hover {
    opacity: 1;
    box-shadow: 0 2px 464px 9px rgba(4, 119, 244, 0.17), 0 4px 11px 1px rgba(4, 119, 244, 0.27);
  }
`

const ArrowBox = styled.div`
  height: var(--spaces-8);
  position: relative;
  display: flex;
  justify-content: center;
  margin: var(--spaces-3) 0;
  opacity: 0.65;
`

const Arrow = styled.div<{ dashed?: boolean }>`
  width: 0;
  border-left: ${({ dashed }) => (dashed ? 'dashed' : 'solid')} 2px #0477f4;
  position: relative;
  margin-bottom: 2px;

  &:before {
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #0477f4;
    position: absolute;
    bottom: -2px;
    left: -10.5px;
  }
`

const ForkArrows = styled.div`
  position: absolute;
  border-color: #0477f4;
  border-style: solid;
  border-width: 2px;
  left: 16.66%;
  right: 16.66%;
`

const BottomForkArrows = styled(ForkArrows)`
  border-bottom-style: none;
  top: 50%;
  bottom: 0;
  margin-bottom: 2px;

  &:before,
  &:after {
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #0477f4;
    position: absolute;
    bottom: -2px;
  }
  &:before {
    left: -10.5px;
  }
  &:after {
    right: -10.5px;
  }
`

const SideArrows = styled(BottomForkArrows)`
  top: 0;
  border-style: dashed;
  border-top-style: none;
  border-bottom-style: none;
`

const TopForkArrows = styled(ForkArrows)`
  border-style: dashed;
  border-top-style: none;
  top: 0;
  bottom: 50%;
`

const IconsGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;

  @media ( min-width: 1024px ){
    width: 100%;
    display: grid;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
    grid-template-columns: 50% 50%;
    grid-template-rows: 3;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
  }

  @media ( min-width: 1225px ){
    width: 100%;
    display: grid;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 2;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
  }


  & > img {
    max-height: 40px;
    width: auto;
  }
`
//pull media queries and make responsive single column

const Citations: React.FC = () => {
  return (
    <RowSection alignItems="center" mb="100">
      <ColumnSection from="2" to="12">
        <Text tag="h3" type="title_highlight" mb="40" align="center">
          Regularly cited by thought leaders in the space
        </Text>
        <IconsGrid>
          <Articles></Articles>
          <Articles></Articles>
          <Articles></Articles>
          <Articles></Articles>
          <Articles></Articles>
          <Articles></Articles>
        </IconsGrid>
      </ColumnSection>
    </RowSection>
  )
}

export default Citations
