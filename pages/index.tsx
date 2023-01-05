import Head from 'next/head'
import styled from 'styled-components'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Citations from 'components/home-sections/Citations'
import Hero from 'components/home-sections/Hero'
import Actions from 'components/home-sections/Actions'
import { NextPage } from 'next'
import Users from 'components/home-sections/Users'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'
import About from 'components/home-sections/About'

const HomeBackgroundActions = styled.div`
  margin-top: var(--spaces-10);
  background-image: url('hp_bg_actions.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: var(--spaces-13);
`
interface HomePageProps {
  sampleData: any
}

const Home: NextPage<HomePageProps> = ({ sampleData }) => {
  return (
    <>
      <Head>
        <title>Homepage | CryptoStats</title>
        <meta
          name="description"
          content="It's easy: just publish an adapter or use the Dataset created by the Community to create and view anything you want."
        />
      </Head>
      <RowSection>
        <ColumnSection>
          <Header />
        </ColumnSection>
      </RowSection>
      <Hero sampleData={sampleData} />
      <About />
      <Citations />
      <Actions />

      <Users />
      <Footer />
    </>
  )
}

export default Home
