import { Outlet } from 'react-router-dom';

import { Navigation } from '../Navigation/Navigation';

import { Main } from './Main/Main';
import { Sidebar } from './Sidebar/Sidebar';

export function AppLayout() {
  return (
    <div className="bg-page full-screen content-center home">
      <Sidebar>
        <Navigation />
      </Sidebar>
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
