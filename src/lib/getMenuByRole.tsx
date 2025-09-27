import { home as homeIcon, menu as menuIcon } from 'ionicons/icons';
import { MenuItem } from 'interfaces/menu';

export const getMenuByRole = (roles: any, access: any) => {
  const mainMenu: MenuItem[] = [
    { title: 'Inicio', icon: homeIcon, path: '/home' },
    { title: 'Menú', icon: menuIcon, path: '/menu' },
  ];

  return {
    mainMenu,
  };
};