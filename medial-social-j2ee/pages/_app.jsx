import '@/public/css/style.css'
import Layout from './components/Layout';
import Head from 'next/head';

export default function App({ Component, pageProps }) {

  return (
    <div>
      <Head>

        <title>Fakeins</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link href='https://fonts.googleapis.com/css?family=MuseoModerno' rel='stylesheet'>
        </link>
        <link href='https://fonts.googleapis.com/css?family=Saira Stencil One' rel='stylesheet'>
        </link>
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
        </link>
        <link href='https://fonts.googleapis.com/css?family=Mali' rel='stylesheet'>
        </link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      </Head>
      <Layout>
        {/* <AppProvider> */}
        <Component {...pageProps} />

        {/* </AppProvider> */}
        
      </Layout>
    </div>
  );
}
