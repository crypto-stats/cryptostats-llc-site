import React from 'react'
import styled from 'styled-components'

const TagElement = styled.div<{
  type?: string
  mt?: string
  mb?: string
  color?: string
  align?: string
  weight?: string
  italic?: boolean
  mobile?:boolean
  tablet?:boolean
}>`

  font-family: 'Inter';
  margin: 0;
  padding: 0;
  font-weight: 400;
  margin-top: ${({ mt }) => (mt ? mt : '0')}px;
  margin-bottom: ${({ mb }) => (mb ? mb : '0')}px;
  text-decoration: none;

  ${({ align }) => align && `text-align: ${align};`}

  ${({mobile}) => mobile && `
  @media (max-width: 420px) {
    text-align: justify;
  }
  text-align:center`
  }

  ${({tablet}) => tablet === true && `
  @media (min-width: 700px) {
    font-weight: 700;
    font-size: 36px;
  }
  `}

  ${({ type }) =>
    type === 'display' &&
    `
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: #272727;

    @media (min-width: 1024px) { 
      font-size: 52px;
      line-height: 56px;
      letter-spacing: -1.5px;
    }
  `}

  ${({ type }) =>
    type === 'title' &&
    `
    font-weight: 600;
    font-size: 36px;
    color: var(--color-strong-text);
  `}

  ${({ type }) =>
    type === 'subtitle' &&
    `
    font-weight: 500;
    font-size: 24px;
    color: var(--color-strong-text);
    letter-spacing: 0.1px;
  `}

  ${({ type }) =>
    type === 'title_highlight' &&
    `
    font-size: 24px;
    color: var(--color-primary);
    letter-spacing: 0.1px;
  `}

  ${({ type }) =>
    type === 'h3' &&
    `
    font-weight: 700;
    font-size: 22px;
    color: var(--color-strong-text);
    letter-spacing: 0.1px;
  `}

  ${({ type }) =>
    type === 'label' &&
    `
    font-size: 12px;
    color: var(--color-muted-text);
    letter-spacing: 1.5px;  
    text-transform: uppercase;
  `}

  ${({ type }) =>
    type === 'description' &&
    `
    font-size: 16px;
    color: var(--color-muted-text);
    line-height: 24px;
  `}

  ${({ type }) =>
    type === 'content' &&
    `
    font-size: 16px;
    color: var(--color-strong-text);
    line-height: 21px;
  `}
  ${({ type }) =>
    type === 'content_small' &&
    `
    font-size: 14px;
    color: var(--color-strong-text);
    line-height: 21px;
  `}
  
  ${({ type }) =>
    type === 'content_big' &&
    `
    font-size: 18px;
    color: var(--color-strong-text);
    line-height: 24px;
  `}

  ${({ type }) =>
    type === 'content_display' &&
    `
    font-weight: 400;
    font-size: 24px;
    color: var(--color-strong-text);
    line-height: 37px;
  `}

  ${({ type }) =>
    type === 'pre' &&
    `
    font-family: monospace;
    font-size: 16px;
    color: var(--color-strong-text);
    line-height: 21px;
    word-break: break-all;
  `}

  ${({italic}) => italic === true && `
  font-style: italic;
` }
 

  font-weight: ${({ weight }) => (weight ? weight : '')};

  ${({ color }) => color && `color: var(--color-${color});`}
`

interface TextProps {
  tag?: React.ElementType | 'div'
  mt?: string | '0'
  mb?: string | '0'
  type?: string
  className?: string
  color?: string
  weight?: string
  align?: string
  href?: string
  italic?: boolean
  mobile?:boolean
  tablet?:boolean
}

const Text: React.FC<TextProps> = ({
  tag,
  type,
  className,
  children,
  mt,
  mb,
  color,
  weight,
  align,
  href,
  italic,
  mobile,
  tablet
}) => {
  return (
    <TagElement
      as={tag}
      className={className}
      type={type}
      mt={mt}
      mb={mb}
      color={color}
      align={align}
      weight={weight}
      href={href}
      italic={italic}
      mobile={mobile}
      tablet={tablet}
    >
      {children}
    </TagElement>
  )
}

export default Text
