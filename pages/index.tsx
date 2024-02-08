import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Google Map Integration">
    <h1>Click on the link to see demo 👋</h1>
    <p>
      <Link href="/map">Google Map</Link>
    </p>
  </Layout>
)

export default IndexPage
