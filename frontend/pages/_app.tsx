// pages/_app.tsx
import { AuthProvider } from '@/context/AuthContext'; // 만든 AuthProvider를 import

function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
