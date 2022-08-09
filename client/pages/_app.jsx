import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import NextNProgress from 'nextjs-progressbar';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
  <>
  <NextNProgress color='#079C49' />
  <Component {...pageProps} />
  </>)
}

export default MyApp
