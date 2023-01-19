import React from 'react'
import Link from 'next/link'
import Text from 'components/Text'
import Button from 'components/Button'
import styled from 'styled-components'


const HeroHolder = styled.div`
height: 100%;
display: -webkit-box;     
display: -moz-box;         
display: -ms-flexbox;      
display: -webkit-flex;     
display: flex;  
flex-direction:column;
-webkit-justify-content:center;
margin:-70px auto 0 auto;
max-width: 800px;

@media ( min-width: 1024px ) {
  -webkit-justify-content: end;
  justify-content:flex-end;


 
`

const HomeBackgroundHead = styled.div`
  height: 754px;

  margin: 0 auto 3rem auto;
  width: calc(var(--container-full) - var(--spaces-9));
  @media (min-width: 768px) {
    max-width: calc(var(--bp-small) - var(--spaces-4));
  }

  @media (min-width: 1024px) {
    width: calc(var(var(--bp-medium)) - var(--spaces-4));

    background-image: url('faded-bg.svg');
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
    margin-bottom: 200px;
  }

  @media (min-width: 992px) {
    max-width: calc(var(--bp-medium) - var(--spaces-4));
  } ;
`

const Hero: React.FC<{ sampleData: any }> = () => {
  return (
    <HomeBackgroundHead>
      <HeroHolder>
        {/* <HeroHolder> */}
        <Text tag="h1" type="display" mb="40" align="center">
          Get your product in front of crypto's most dedicated users
        </Text>

        <Text mb="40" align="center" mobile color="gray">
          With over 1m unique visitors a year, where 61% navigate directly to our sites from their
          own bookmarks, we have some of the most dedicated users in Crypto ready to try your
          product.
        </Text>

        <Link href="/apply" passHref>
          <Button variant="primary" size="large" width="hero">
            <Text tag="p" align="center">
              Apply to become a sponsor
            </Text>
          </Button>
        </Link>
      </HeroHolder>
    </HomeBackgroundHead>
  )
}

export default Hero
