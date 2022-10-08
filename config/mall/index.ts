import { AUTH_ITEM_ENUM } from '../../src/common/authList';

export default {
  name: '商城管理',
  path: '/mall',
  title: AUTH_ITEM_ENUM.MALL,
  access: 'normalRouteFilter',
  icon: 'gift',
  routes: [
    {
      path: '/mall',
      redirect: '/mall/category',
    },
    {
      name: '商品分类',
      path: '/mall/category',
      title: AUTH_ITEM_ENUM.MALL_CATEGORY,
      access: 'normalRouteFilter',
      icon: 'setting',
      routes: [
        {
          name: '商品分类',
          hideInMenu: true,
          icon: 'team',
          path: '/mall/category',
          component: './mall/Category',
        },
        {
          name: '属性值管理',
          hideInMenu: true,
          icon: 'team',
          path: '/mall/category/attrVal',
          component: './mall/AttrVal',
        },
        {
          name: '属性key管理',
          hideInMenu: true,
          icon: 'team',
          path: '/mall/category/attrKey',
          component: './mall/AttrKey',
        },
      ],
    },
  ],
};
