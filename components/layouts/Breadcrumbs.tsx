import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const BreadcrumbContainer = styled.ol`
  display: flex;
  padding: 0;
  margin: 16px 0;
  width: 100%;
`

const BreadcrumbItem = styled.li`
  list-style: none;

  &:after {
    content: '/';
    display: inline-block;
    color: #888;
  }
  &:last-child:after {
    display: none;
  }

  a {
    color: #888;
  }

  &:last-child {
    a {
      color: var(--color-primary);
    }
  }
`

const BreadcrumbLink = styled.a`
  text-decoration: none;
  padding: 0 4px;

  &:hover {
    color: var(--color-primary);
  }
`

interface BreadcrumbsProps {
  breadcrumbs: { name: string; path: string }[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <BreadcrumbContainer>
      {breadcrumbs.map((({ name, path }: { name: string, path: string }) => (
        <BreadcrumbItem key={path}>
          <Link href={path} passHref>
            <BreadcrumbLink>{name}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      )))}
    </BreadcrumbContainer>
  )
}

export default Breadcrumbs
