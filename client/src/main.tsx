import store from '@/app/store';
import { jwtDecode } from 'jwt-decode';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { JwtPayload } from './app/types.ts';
import { setUser } from './features/user/userSlice.ts';
import './index.css';

if (localStorage.getItem('token')) {
  const decoded = jwtDecode(localStorage.getItem('token')!);
  store.dispatch(setUser(decoded as JwtPayload['user']));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
