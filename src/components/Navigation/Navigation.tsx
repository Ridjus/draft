import { NavLink } from 'react-router-dom';

import { ReactComponent as Home } from '~/assets/icons/home.svg';
import { ReactComponent as AccountSettings } from '~/assets/icons/manage_account.svg';
import { ReactComponent as AppSettings } from '~/assets/icons/settings.svg';

import './Navigation.css';

export function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/app/home" className="nav-link">
        <Home className="nav-icon" />
        Home
      </NavLink>
      <NavLink to="/app/user-settings" className="nav-link">
        <AccountSettings className="nav-icon" />
        Account settings
      </NavLink>
      <NavLink to="/app/app-settings" className="nav-link">
        <AppSettings className="nav-icon" />
        Manage
      </NavLink>
    </nav>
  );
}
