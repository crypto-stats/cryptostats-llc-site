import Head from 'next/head'
import Header from 'components/Header'
import { NextPage } from 'next'
import Grants from 'components/home-sections/Grants'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'

const GrantsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Grants | CryptoStats</title>
        <meta
          name="description"
          content="Over the years we've been lucky to get grants from projects and people that want to support out public goods project. Below are some of the projects that have supported us."
        />
      </Head>
      <RowSection >
        <ColumnSection >
          <Header />
        </ColumnSection>
      </RowSection>

      <Grants />
    </>
  )
}

export default GrantsPage
