import Head from 'next/head'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Citations from 'components/home-sections/Citations'
import Hero from 'components/home-sections/Hero'
import Sponsor from 'components/home-sections/Sponsor'
import { NextPage } from 'next'
import Users from 'components/home-sections/Users'
import RowSection from 'components/RowSection'
import ColumnSection from 'components/ColumnSection'
import About from 'components/home-sections/About'


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
      <RowSection >
        <ColumnSection >
          <Header />
        </ColumnSection>
      </RowSection>
      <Hero sampleData={sampleData} />
      <About />
      <Citations />
      <Sponsor />

      <Users />
      <Footer />
    </>
  )
}

export default Home
