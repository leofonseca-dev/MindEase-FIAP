import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconHome,
  IconReportMoney,
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: uniqueId(),
    title: 'Início',
    icon: IconHome,
    href: '/home',
  },
  {
    id: uniqueId(),
    title: 'Transações',
    icon: IconReportMoney,
    href: '/transactions',
  },
];

export default Menuitems;
