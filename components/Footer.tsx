import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import RowSection from './RowSection'
import ColumnSection from './ColumnSection'
import Text from './Text'

const FooterContainer = styled(RowSection)`
  padding: var(--spaces-12) 0;
  border-top: 1px solid var(--color-primary-800);
`

const Logo = styled.div<{ dark?: boolean }>`
  background-image: url(${({ dark }) => (dark ? '/logo-all-white.svg' : '/llc-logo.svg')});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 190px;
  margin: 4px 0;
  height: 40px;
`

const NavContainer = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: flex-end;
    
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items:start;

  & + & {
    margin-top: var(--spaces-4);
  }

  @media (min-width: 1024px) {
    & + & {
      margin-top: 0;
      margin-left: var(--spaces-10);
    }
  }
`

const NavLink = styled.a`
  line-height: 40px;
  color: var(--color-normal-text);
  font-size: 18px;
  font-weight:500;
  text-decoration: none;

  &:hover {
    color: #555;
  }
`

const Footer = ({ dark }: { dark?: boolean }) => {
  return (
    <FooterContainer mt="40" alignItems="center">
      <ColumnSection columns="5">
        <Logo dark={dark} />
        <Text tag="p" type="description" mt="24">
          One neutral source of truth for crypto metrics.
          <br />
          Used by everyone, managed by the community.
        </Text>
      </ColumnSection>
      <ColumnSection columns="7">
        <NavContainer>
          <Nav>
            {/* <Link href="/" passHref>
              <NavLink>Contributers</NavLink>
            </Link> */}
          </Nav>

          <Nav>
          <Link href="https://twitter.com/CryptoStats_" passHref>
            <NavLink >
              Become a sponsor
            </NavLink>
            </Link>
          </Nav>
        </NavContainer>
      </ColumnSection>
    </FooterContainer>
  )
}

export default Footer
