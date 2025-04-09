import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('dietician');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        type,
      });

      alert('Kayıt başarılı!');

      if (type === 'diyetisyen') {
        window.location.href = '/dieti';
      } else {
        window.location.href = '/client';
      }
    } catch (err) {
      console.error('Kayıt Hatası:', (err as Error).message);
      alert('Bir hata oluştu: ' + (err as Error).message);
    }
  };
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error('Çıkış Hatası:', error);
    }
  };

  return (
    <div className="container mt-5">
      {isLoggedIn && (
        <>
          <p>Giriş yapılmış durumda.</p>
          <button onClick={handleLogOut} className="btn btn-outline-danger">
            Çıkış Yap
          </button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <h2 className="mb-4">Kayıt Ol</h2>
          <form onSubmit={handleRegister}>
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

            <div className="mb-3">
              <label className="form-label">Kullanıcı Tipi</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="dietician">Diyetisyen</option>
                <option value="client">Danışan</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Kayıt Ol
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Register;
