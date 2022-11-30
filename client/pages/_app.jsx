import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import NextNProgress from 'nextjs-progressbar';
import ProtectedRoutes from './protectedRoute'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
config.autoAddCss = false;


const isBrowser = typeof window !== "undefined";


function MyApp({ Component, pageProps }) {


  const router = useRouter()

  
  return (
    
  <>
  <NextNProgress color='#079C49' />
  <ProtectedRoutes router={router}>
      <Component {...pageProps} />
    </ProtectedRoutes>
    
  </>)
}

export default MyApp
