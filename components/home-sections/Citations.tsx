import React from 'react'
import styled from 'styled-components'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'
import Text from 'components/Text'
import Script from 'next/script'




const Articles = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  box-sizing: border-box;
  width: 350px;
  height: 350px;
  max-width:370px;
  max-height: 370px;
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
    grid-template-columns: 10% 10%;
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
          <Articles><blockquote className="twitter-tweet"><p lang="en" dir="ltr">Needs to get under $0.05 to be truly acceptable imo. But we&#39;re definitely making great progress, and even proto-danksharding may be enough to get us there for a while!</p>&mdash; vitalik.eth (@VitalikButerin) <a href="https://twitter.com/VitalikButerin/status/1521501499410587653?ref_src=twsrc%5Etfw">May 3, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js"></script></Articles>
          <Articles><blockquote data-conversation="none"><p lang="en" dir="ltr">We can visualize the buy-side demand for blockspace with <a href="https://t.co/GjLI0qNGtS">https://t.co/GjLI0qNGtS</a>. People are paying real money in fees to store things on chain, just like they paid for bandwidth.<br/><br/>These fees are analogous to *revenue* for each L1 chain, and give some basis for coin valuation.</p>&mdash; Balaji (@balajis) <a href="https://twitter.com/balajis/status/1479867973326102528?ref_src=twsrc%5Etfw">January 8, 2022</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js"></Script></Articles>
          <Articles><blockquote  data-conversation="none"><p lang="en" dir="ltr">There are many crypto protocols that have meaningful cash flows. Ethereum generated $31M in fees yesterday. As with SaaS in the early years, the market is trying to predict growth of those cash flows. <a href="https://t.co/0lpULxQexO">https://t.co/0lpULxQexO</a></p>&mdash; cdixon.eth (@cdixon) <a href="https://twitter.com/cdixon/status/1473890484741296130?ref_src=twsrc%5Etfw">December 23, 2021</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js"></Script></Articles>
          <Articles><blockquote data-conversation="none"><p lang="en" dir="ltr">There is a difference between what a dapp generates and what the chain does. Great for jpg. I hope there is a robust NFT ecosystem for him and he makes a ton $$$. Check out <a href="https://t.co/5rJOHkeioQ">https://t.co/5rJOHkeioQ</a>. It&#39;s a usable reference site</p>&mdash; Mark Cuban (@mcuban) <a href="https://twitter.com/mcuban/status/1556853332249026560?ref_src=twsrc%5Etfw">August 9, 2022</a></blockquote> <Script async src="https://platform.twitter.com/widgets.js" ></Script></Articles>
         
        </IconsGrid>
      </ColumnSection>
    </RowSection>
  )
}

export default Citations
