import React from 'react';
import { useAllUsers } from '../hooks/useUsers';
import Forms from '../components/template/Forms';
import SplashScreen from '../components/template/SplashScreen';
import bg from '../assets/gradiendbg.jpeg';

function Home() {
  const { allUsersQuery, isLoading, isError } = useAllUsers();

  console.log('users:', allUsersQuery);

  return (
    <div className="w-full h-full" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <SplashScreen />
    </div>
  );
}

export default Home;
