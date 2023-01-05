import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'
import Text from 'components/Text'
import Button from 'components/Button'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
// @ts-ignore
import theme from 'react-syntax-highlighter/dist/cjs/styles/hljs/stackoverflow-dark'

SyntaxHighlighter.registerLanguage('javascript', js)

const Graphic = styled.img`
width:100%;
height: auto;
`

const Actions: React.FC = () => {

  return (
    <>
      <RowSection mt="120">
        <ColumnSection from="1" to="6">
          <Text tag="h3" type="title_highlight" mb="40" align="left">
            How to become a sponsor
          </Text>

          <Text tag="p" type="content_big" mt="32" mb="32">
            Each of our info sites have a simple centered format with a footer area that will be
            available for sponsors to use for promotion. Instead of having sponsors buy placements
            on each individual site, we will sell our advertisements on a rotation system where
            sponsors can purchase 33% of the time on the sites in units of one month. <br />
            <br />
            This means that if you bought one unit for one month, your placement would be shown on
            all sites 33% of the time, and other sponsors can come in and purchase the rest of the
            units having their placement shown as well.
            <br />
            <br />
            Ads have a floor price and go to the highest bidder. When slots have been purchased,
            they show up in our sponsorship calendar.
          </Text>
        </ColumnSection>
        <ColumnSection from="7" to="12">
          <Graphic src="/image-collections.png" alt="Collections" />
        </ColumnSection>
      </RowSection>
    </>
  )
}

export default Actions
