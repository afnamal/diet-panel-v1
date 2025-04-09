import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../firebase';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogOut = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <div className="navbar-nav ms-auto">
          {!isLoggedIn ? (
            <a className="nav-link" href="/login">
              Giriş Yap
            </a>
          ) : (
            <button onClick={handleLogOut}>Çıkış Yap</button>
          )}

          <a className="nav-link" href="/register">
            Kayıt Ol
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
