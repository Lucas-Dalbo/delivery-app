import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  const roleObj = {
    customer: { text: 'My Orders', url: '/customer/orders' },
    seller: { text: 'Orders', url: '/seller/orders' },
    administrator: { text: 'User Management', url: '/admin/manage' },
  };

  useEffect(() => () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user.name);
    setUserRole(user.role);
  });

  const defineNavLink = () => (
    <NavLink
      data-testid="customer_products__element-navbar-link-orders"
      to={ `${roleObj[userRole].url}` }
    >
      { roleObj[userRole].text }
    </NavLink>
  );

  return (
    <header>
      <nav>
        {userRole === 'customer' && (
          <NavLink
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Products
          </NavLink>
        )}
        {userRole.length && defineNavLink()}
        <NavLink
          data-testid="customer_products__element-navbar-user-full-name"
          to="/user"
        >
          { userName }
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ () => localStorage.removeItem('user') }
        >
          Logout
        </NavLink>
      </nav>
    </header>
  );
}
