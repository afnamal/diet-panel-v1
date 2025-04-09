import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

interface Client {
  id: string;
  email: string;
  type: string;
}

const Home = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();

  const columns = [
    { field: 'email', headerName: 'E-posta', width: 200 },
    { field: 'type', headerName: 'Tip', editable: true },
    { field: 'id', headerName: 'Danışan ID', minWidth: 200 },
  ];

  const handleRowClick = (params: { row: Client }) => {
    navigate(`/dietician/client/${params.row.id}`);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const q = query(collection(db, 'users'), where('type', '==', 'client'));
        const querySnapshot = await getDocs(q);
        const clientsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          type: doc.data().type,
        }));
        setClients(clientsData);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Danışanlarım</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={clients}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default Home;
