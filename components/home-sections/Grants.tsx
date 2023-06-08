import React from 'react'
import styled from 'styled-components'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'
import Text from 'components/Text'


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

const Logo = styled.img`
  height: 50px;
  align-self: flex-start;
  margin-bottom: 8px;
`

const CardLink = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const GITCOIN_LINK = 'https://explorer.gitcoin.co/#/round/1/0xaa40e2e5c8df03d792a52b5458959c320f86ca18/0xaa40e2e5c8df03d792a52b5458959c320f86ca18-182';

const Grants: React.FC = () => {
  return (
    <RowSection mt="140" mb='140' alignItems='center'>
      <ColumnSection from="4" to="10">
        <Text tag="h1" mb="40" align="center">Grants</Text>
        <Text tag="p" type="content_big" mb="40" mobile>
          Over the years we've been lucky to get grants from projects and people that want to support out public goods project. Below are some of the projects that have supported us.
        </Text>
      </ColumnSection>
      <ColumnSection from='2' to='12'>
        <Rules>
          <Logo src="/uf.svg" />
          <Text tag='h3' mb='10' weight='500' italic>
            <CardLink href="https://www.uniswapfoundation.org">Uniswap Foundation</CardLink>
          </Text>
          <Text>We're grateful to the Uniswap Foundation and the Uniswap Grants Program (UGP) for supporting the ongoing maintenance of CryptoStats sites and the development of new functionality.</Text>
        </Rules>
        <Rules>
          <Logo src="/gitcoin.svg" />
          <Text tag='h3' mb='10' weight='500' italic>Gitcoin Grants</Text>
          <Text>Gitcoin has been a crucial tool for ongoing funding for CryptoStats. We're grateful to all contributors to the <a href={GITCOIN_LINK}>CryptoStats Gitcoin Grant</a>.</Text>
        </Rules>
      </ColumnSection>
    </RowSection>
  )
}

export default Grants
