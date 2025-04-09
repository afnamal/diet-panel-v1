import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Landing Page</div>
      <button onClick={() => navigate('/dietician')}>Go to Clients List</button>
    </>
  );
};

export default Landing;
