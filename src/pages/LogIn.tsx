import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error('Çıkış Hatası:', error);
    }
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.type === 'diyetisyen') {
            window.location.href = '/dietician';
          } else {
            window.location.href = '/client';
          }
        }
      }
    } catch (error) {
      console.error('Giriş Hatası:', error);
    }
  };

  return (
    <div className="container mt-5">
      {isLoggedIn ? (
        <div className="text-center">
          <h3>Zaten giriş yapmış durumdasınız</h3>
          <button onClick={handleLogOut} className="btn btn-danger mt-3">
            Çıkış Yap
          </button>
        </div>
      ) : (
        <>
          <h2 className="mb-4">Giriş Yap</h2>
          <form onSubmit={handleLogIn}>
            <div className="mb-3">
              <label className="form-label">E-posta</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Şifre</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Giriş Yap
            </button>
          </form>{' '}
        </>
      )}
    </div>
  );
};

export default LogIn;
