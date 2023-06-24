// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Contracts Opertations',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'New users contracts',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Curnnet users contracts',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Archif users contracts',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Contracts Offiers',
      type: 'item',
      icon: icons.IconWindmill,
      url: '/icons/tabler-icons',
      breadcrumbs: false     
    }
  ]
};

export default utilities;
