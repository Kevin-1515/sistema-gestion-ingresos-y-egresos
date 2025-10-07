import React from 'react';
import './Sidebar.css';
import { Button } from '../ui/button';

const Sidebar = () => {
  return (
    <div className='sidebar debug flex flex-col justify-between'>
      <Button>Ingresos y egresos</Button>
      <Button>Usuarios</Button>
      <Button>Reportes</Button>
    </div>
  );
};

export default Sidebar;