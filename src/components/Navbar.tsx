import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        const userDoc = doc(collection(db, 'users'), user.uid);
        const userSnapshot = await getDoc(userDoc);
        setUserType(userSnapshot.data()?.type || null);
      }
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
        {userType === 'dietician' && (
          <div className="navbar-nav">
            <a className="nav-link" href="/dietician/add-menu">
              Menü Ekle
            </a>
            <a className="nav-link" href="/dietician/add-food">
              Yemek Ekle
            </a>
          </div>
        )}
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
