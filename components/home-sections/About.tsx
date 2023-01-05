import Button from 'components/Button'
import ColumnSection from 'components/ColumnSection'
import RowSection from 'components/RowSection'
import Text from 'components/Text'
import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.section`
  margin: 40px;
  padding: 40px;
`

const Graphic = styled.img`
  width: 100%;
  height: auto;
`

const Split = styled.div`
  display: flex;
  & > a {
    margin: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  & .desktop-only {
    display: none;
  }
`

export default function About() {
  return (
    // <Container>
      <RowSection alignItems="center" mb='100'>
        <ColumnSection from="2" to="6">
          <Text tag="h3" type="title_highlight" mb="24">
            About our sites
          </Text>
          <Text tag="p" type="content_big" mb="16">
          CryptoStats is mostly known for how we visualize data in simple and useful info sites like cryptofees.info or l2fees.info. As a matter of fact, we have 7 sites that are racking up close to a million views a year. 
          </Text>
        </ColumnSection>

        <ColumnSection from="7" to="12">
          <Graphic src="/traffic-stats.svg" />
        </ColumnSection>
      </RowSection>
    // </Container>
  )
}
