import React from 'react'
import styled from 'styled-components'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'
import Text from 'components/Text'
import Button from 'components/Button'



const Rules = styled.div`
border: 1px solid var(--color-primary-800);
display:flex;
flex-direction:column;
justify-content:center;
padding:20px;
transition: var(--transition-fast);
margin-bottom: 2rem;

&:hover {
  opacity: 1;
  box-shadow: 0 2px 14px 1px rgba(0, 0, 0, 0.13);
}
`

    {/* <UsedByGrid>
            <img src="clients/bloomberg.png" alt="Bloomberg" style={{ height: '26px' }} />
            <img src="clients/cryptofees.png" alt="CryptoFees" />
            <img src="clients/cryptotester.png" alt="CryptoTesters" />
            <img src="clients/openbb.svg" alt="OpenBB" style={{ height: '' }} />
</UsedByGrid> */}

const Users: React.FC = () => {
  return (
    <>
      <RowSection mt="140" mb='140' alignItems='center'>
        <ColumnSection from="4" to="10">
          <Text tag="h3" type="title_highlight" mb="40" align="center">
          Who can apply (our philosophy)
          </Text>
          <Text tag="p" type="content_big" mb="40" mobile>
          CryptoStats aims to be a neutral source of truth for crypto metrics, that is our aim above all else. To ensure that is always the case, we are using the following principles to determine what funding sources we are willing to accept and not:
          </Text>
        </ColumnSection>
        <ColumnSection from='2' to='12'>
        <Rules>
          <Text tag='h3' mb='10' weight='500' italic>Rule 1: “Always be transparent and open to criticism”</Text>
          <Text>We aim to do our best to develop funding sources in a way that keeps us as neutral and unbiased as possible, but we are merely humans and therefore keep our funding sources open to the public such that people in the community can voice their opinion and help nudge us in the right direction should we stray.</Text>
        </Rules>
        <Rules>
        <Text tag='h3' mb='10' weight='500' italic>Rule 2: “Never depend on a single sponsor”</Text>
          <Text>We’ll aim to have a diversified set of sponsors, and never have more than 50% of our funding come from one entity, which reduces the chance of becoming dependent on other projects.</Text>
        </Rules>
        <Rules>
        <Text tag='h3' mb='10' weight='500' italic>Rule 3: “Never sponsor projects with a token listed on our sites”</Text>
        <Text>If a project has a token and is listed on any of our sites, we’ll refrain from taking sponsorships from them.</Text>
        </Rules>
        </ColumnSection>
        <ColumnSection from='5' to='9'>
        <Text tag="p" type="content_big" mt='20' align='center'>
        All our sponsors can be found here,  and feedback can be made in our community forum. 
        </Text>
        
        </ColumnSection>
        <ColumnSection from="4" to="10">
          <Text tag="h3" type="title_highlight" mb="40" mt='100' align="center">
          Apply to become a sponsor
          </Text>
          <Text tag="p" type="content_big" mb="32" mobile>
          Are you ready to start driving leads to your site? Fill in your details below and we’ll get back to you within 24 hours. If you have any questions, feel free to hit kalle@cryptostats.llc directly.</Text>
          <Button variant="primary" size="large">
            Apply to become a sponsor
          </Button>
        </ColumnSection>
      </RowSection>
    </>
  )
}

export default Users
