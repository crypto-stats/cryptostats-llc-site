import React from 'react'
import styled from 'styled-components'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'
import Text from 'components/Text'




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
