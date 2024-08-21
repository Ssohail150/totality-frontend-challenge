// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css'; // Import global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
