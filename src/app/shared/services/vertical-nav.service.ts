import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Menu {
  id?: number;
  level?: number;
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  type?: string;
  icon?: string;
  active?: boolean;
  bookmark?: boolean;
  items?: Menu[];
  children?: Menu[];
  mainMenuActive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VerticalNavService {
  public isDisplay: boolean | undefined;
  constructor() { }

  verticalMenuItem: Menu[] = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'home',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          path: '/dashboard/authors',
          title: 'Authors ',
          type: 'link',
          level: 2,
          active: false,
        },
        {
          path: '/dashboard/readers',
          title: 'Readers',
          type: 'link',
          level: 2,
          active: false,
        },
        {
          path: '/dashboard/agents',
          title: 'Agents',
          type: 'link',
          level: 2,
          active: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Users',
      icon: 'user',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/users/users-edit',
          title: 'User Profile',
          type: 'link',
        },
      ],
    },

    {
      id: 3,
      title: 'Crowd Agent',
      icon: 'widget',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/crowdagent/listview',
          title: 'Pick Titles That Pique Your Interest',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/crowdagent/pique',
          title: 'Dive Into A Title',
          type: 'link',
        },
      ],
    },
    {
      id: 4,
      title: 'Page Layout',
      icon: 'layout',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/page-layout/hide-nav-scroll',
          title: 'Hide Nav Scrool',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/page-layout/footer-light',
          title: 'Footer Light',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/page-layout/footer-dark',
          title: 'Footer Dark',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/page-layout/footer-fixed',
          title: 'Footer Fixed',
          type: 'link',
        },
      ],
    },
    {
      id: 5,
      title: 'Projects',
      icon: 'project',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/projects/project-list',
          title: 'Author Project List',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/projects/create-new',
          title: 'Create New Project',
          type: 'link',
        },
      ],
    },
    {
      id: 6,
      title: 'File Manager',
      icon: 'file',
      type: 'link',
      path: '/file-manager',
      level: 1,
      bookmark: true,
    },
    {
      id: 7,
      title: 'Ecommerce',
      icon: 'ecommerce',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/ecommerce/product',
          title: 'Product',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/product-page',
          title: 'Product Page',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/product-list',
          title: 'Product List',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/payment-detail',
          title: 'Payment Details',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/order-history',
          title: 'Order History',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/invoice',
          title: 'Invoice',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/cart',
          title: 'Cart',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/wishlist',
          title: 'Wishlist',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/checkout',
          title: 'Checkout',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ecommerce/pricing',
          title: 'Pricing',
          type: 'link',
        },
      ],
    },
    {
      id: 8,
      title: 'Email',
      icon: 'email',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/email/email-app',
          title: 'Email App',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/email/email-compose',
          title: 'Email Compose',
          type: 'link',
        },
      ],
    },
    {
      id: 9,
      title: 'Chat',
      icon: 'chat',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/chat/chat-app',
          title: 'Chat App',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/chat/video-chat',
          title: 'Video App',
          type: 'link',
        },
      ],
    },
    {
      id: 10,
      title: 'Bookmarks',
      icon: 'bookmark',
      type: 'link',
      path: '/bookmarks',
      level: 1,
      bookmark: true,
    },
    {
      id: 11,
      title: 'Contacts',
      icon: 'contact',
      type: 'link',
      path: '/contacts',
      level: 1,
      bookmark: true,
    },
    {
      id: 12,
      title: 'Tasks',
      icon: 'task',
      type: 'link',
      path: '/tasks',
      level: 1,
    },
    {
      id: 13,
      title: 'Calander',
      icon: 'calendar',
      type: 'link',
      path: '/calander',
    },
    {
      id: 14,
      title: 'Social Apps',
      icon: 'social',
      type: 'link',
      path: '/social-app',
      level: 1,
    },
    {
      id: 15,
      title: 'To-Do',
      icon: 'to-do',
      type: 'link',
      path: '/todo',
      level: 1,
    },
    {
      id: 16,
      title: 'Search Result',
      icon: 'search',
      type: 'link',
      path: '/search-result',
      level: 1,
    },
    {
      id: 17,
      title: 'Forms',
      icon: 'form',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          id: 17,
          title: 'Form Controls',
          type: 'sub',
          active: false,
          level: 2,
          children: [
            {
              level: 3,
              path: '/form-control/form-validation',
              title: 'Form Validation',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-control/base-input',
              title: 'Base Input',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-control/checkbox-radio',
              title: 'Checkbox & Radio',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-control/input-groups',
              title: 'Input Groups',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-control/mega-options',
              title: 'Mega Options',
              type: 'link',
            },
          ],
        },
        {
          id: 17,
          title: 'Form Widgets',
          type: 'sub',
          active: false,
          level: 2,
          children: [
            {
              level: 3,
              path: '/form-widgets/datepicker',
              title: 'Datepicker',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-widgets/touchspin',
              title: 'Touchspin',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-widgets/select2',
              title: 'Select2',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-widgets/switch',
              title: 'Switch',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-widgets/typeahead',
              title: 'Typeahead',
              type: 'link',
            },
            {
              level: 3,
              path: '/form-widgets/clipboard',
              title: 'Clipbard',
              type: 'link',
            },
          ],
        },
      ],
    },
    {
      id: 18,
      title: 'Tables',
      icon: 'table',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          id: 18,
          title: 'Bootstrap Tables',
          type: 'sub',
          level: 2,
          children: [
            {
              level: 3,
              path: '/bootstrap-tables/basic-tables',
              title: 'Basic Tables',
              type: 'link',
            },
            {
              level: 3,
              path: '/bootstrap-tables/table-compoents',
              title: 'Table Components',
              type: 'link',
            },
          ],
        },
        {
          title: 'Data Tables',
          icon: 'task',
          type: 'link',
          path: '/data-tables',
          level: 2,
        },
      ],
    },
    {
      id: 19,
      title: 'UI Kits',
      icon: 'ui-kits',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/ui-kits/typography',
          title: 'Typography',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/avatars',
          title: 'Avatars',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/helper-classes',
          title: 'Helper Classes',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/grid',
          title: 'Grid',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/tag-pills',
          title: 'Tag & Pills',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/progress',
          title: 'Progress',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/modal',
          title: 'Modal',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/alert',
          title: 'Alert',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/popover',
          title: 'Popover',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/tooltip',
          title: 'Tooltip',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/dropdown',
          title: 'Dropdown',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/accordion',
          title: 'Accordion',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/tabs',
          title: 'Tabs',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/ui-kits/lists',
          title: 'Lists',
          type: 'link',
        },
      ],
    },
    {
      id: 20,
      title: 'Bonus UI',
      icon: 'bonus-kit',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/bonus-ui/toasts',
          title: 'Toast',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/rating',
          title: 'Rating',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/dropzone',
          title: 'Dropzone',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/sweetalert2',
          title: 'SweetAlert2',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/owl-carousel',
          title: 'Owl carousel',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/ribbons',
          title: 'Ribbons',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/pagination',
          title: 'Pagination',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/breadcrumb',
          title: 'Breadcrumb',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/range-slider',
          title: 'Range Slider',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/image-cropper',
          title: 'Image Cropper',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/basic-card',
          title: 'Basic Card',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/creative-card',
          title: 'Creative Card',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/bonus-ui/timeline',
          title: 'Timeline',
          type: 'link',
        },
      ],
    },
    {
      id: 21,
      title: 'Icons',
      icon: 'icons',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/icon/flag-icon',
          title: 'Flag Icon',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/icon/fontawesome-icon',
          title: 'Fontawesome Icon',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/icon/ico-icon',
          title: 'Ico Icon',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/icon/thimify-icon',
          title: 'Themify Icon',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/icon/feather-icon',
          title: 'Feather Icon',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/icon/whether-icon',
          title: 'Whether Icon',
          type: 'link',
        },
      ],
    },
    {
      id: 22,
      title: 'Buttons',
      icon: 'button',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/button/default-style',
          title: 'Default Style',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/button/flat-style',
          title: 'Flat Style',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/button/edge-style',
          title: 'Edge Style',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/button/raised-style',
          title: 'Raised Style',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/button/button-group',
          title: 'Button Group',
          type: 'link',
        },
      ],
    },
    {
      id: 23,
      title: 'Charts',
      icon: 'charts',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/charts/apex-chart',
          title: 'Apex Chart',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/charts/google-chart',
          title: 'Google Chart',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/charts/chartjs',
          title: 'Chartjs Chart',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/charts/chartist',
          title: 'Chartist Chart',
          type: 'link',
        },
      ],
    },
    {
      id: 24,
      path: '/sample-page',
      title: 'Sample Page',
      icon: 'sample-page',
      type: 'link',
      level: 1,
    },
    {
      id: 25,
      title: 'Pages',
      icon: 'others',
      type: 'sub',
      level: 1,
      children: [
        {
          id: 25,
          title: 'Error Page',
          type: 'sub',
          level: 2,
          children: [
            {
              level: 3,
              path: '/error-page/error400',
              title: 'Error Page 400',
              type: 'link',
            },
            {
              level: 3,
              path: '/error-page/error401',
              title: 'Error Page 401',
              type: 'link',
            },
            {
              level: 3,
              path: '/error-page/error403',
              title: 'Error Page 403',
              type: 'link',
            },
            {
              level: 3,
              path: '/error-page/error404',
              title: 'Error Page 404',
              type: 'link',
            },
            {
              level: 3,
              path: '/error-page/error500',
              title: 'Error Page 500',
              type: 'link',
            },
            {
              level: 3,
              path: '/error-page/error503',
              title: 'Error Page 503',
              type: 'link',
            },
          ],
        },
        {
          id: 25,
          title: 'Authentication',
          type: 'sub',
          level: 2,
          children: [
            {
              level: 3,
              path: '/authentication/simple',
              title: 'Login Simple',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/image-one',
              title: 'Login with Bg image',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/image-two',
              title: 'Login with Image two',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/validation',
              title: 'Login with Validation',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/tooltip',
              title: 'Login with Tooltip',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/login-sweetalert',
              title: 'Login with Sweetalert',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/register-simple',
              title: 'Register Simple',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/register-image-one',
              title: 'Register with Bg image',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/register-image-two',
              title: 'Register with image two',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/unlock-user',
              title: 'Unlock User',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/forgot-password',
              title: 'Forgot Password',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/reset-password',
              title: 'Reset Password',
              type: 'link',
            },
            {
              level: 3,
              path: '/authentication/maintenance',
              title: 'Maintenance',
              type: 'link',
            },
          ],
        },
        {
          id: 25,
          title: 'Coming Soon',
          type: 'sub',
          level: 2,
          children: [
            {
              level: 3,
              path: '/coming-soon/coming-simple',
              title: 'Coming Simple',
              type: 'link',
            },
            {
              level: 3,
              path: '/coming-soon/coming-with-bg-video',
              title: 'Coming with Bg video',
              type: 'link',
            },
            {
              level: 3,
              path: '/coming-soon/coming-with-bg-image',
              title: 'Coming with Bg Image',
              type: 'link',
            },
          ],
        },
        {
          id: 25,
          title: 'Email templates',
          type: 'sub',
          level: 2,
          children: [
            {
              level: 3,
              path: 'https://admin.pixelstrap.com/boho/template/basic-template.html',
              title: 'Basic Email',
              type: 'extTabLink',
            },
            {
              level: 3,
              path: 'https://admin.pixelstrap.com/boho/template/email-header.html',
              title: 'Basic With Header',
              type: 'extTabLink',
            },
            {
              level: 3,
              path: 'https://admin.pixelstrap.com/boho/template/template-email.html',
              title: 'Ecomerce Template',
              type: 'extTabLink',
            },
            {
              level: 3,
              path: 'https://admin.pixelstrap.com/boho/template/template-email-2.html',
              title: 'Email Template 2',
              type: 'extTabLink',
            },
            {
              level: 3,
              path: 'https://admin.pixelstrap.com/boho/template/ecommerce-templates.html',
              title: 'Ecommerce Email',
              type: 'extTabLink',
            },
            {
              level: 3,
              path: 'https://admin.pixelstrap.com/boho/template/email-order-success.html',
              title: 'Order Success',
              type: 'extTabLink',
            },
          ],
        },
      ],
    },
    {
      id: 26,
      title: 'Gallery',
      icon: 'gallery',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/gallery/gallery-grid',
          title: 'Gallery Grid',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/gallery/gallery-grid-desc',
          title: 'Gallery Grid Desc',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/gallery/masonry-gallery',
          title: 'Masonry Gallery',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/gallery/masonry-with-desc',
          title: 'Masonry With Desc',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/gallery/hover-effects',
          title: 'Hover Effect',
          type: 'link',
        },
      ],
    },
    {
      id: 27,
      title: 'Blog',
      icon: 'blog',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/blog/blog-details',
          title: 'Blog Details',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/blog/blog-single',
          title: 'Blog Single',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/blog/add-post',
          title: 'Add Post',
          type: 'link',
        },
      ],
    },
    {
      id: 28,
      path: '/faq',
      title: 'FAQ',
      icon: 'faq',
      type: 'link',
      active: false,
      level: 1,
    },
    {
      id: 29,
      title: 'Job Search',
      icon: 'job-search',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/job-search/cards-view',
          title: 'Card View',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/job-search/list-view',
          title: 'List View',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/job-search/job-details',
          title: 'Job Details',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/job-search/apply',
          title: 'Apply',
          type: 'link',
        },
      ],
    },
    {
      id: 30,
      title: 'Learning',
      icon: 'learning',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          path: '/learning/learning-list',
          title: 'Learning List',
          type: 'link',
        },
        {
          level: 2,
          path: '/learning/detailed-course',
          title: 'Detailed Course',
          type: 'link',
        },
      ],
    },
    {
      id: 31,
      title: 'Maps',
      icon: 'maps',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          level: 2,
          active: false,
          path: '/maps/google-map',
          title: 'Google Map',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/maps/leaflet-map',
          title: 'Leaflet Maps',
          type: 'link',
        },
      ],
    },
    {
      id: 32,
      title: 'Editors',
      icon: 'editors',
      active: false,
      level: 1,
      type: 'sub',
      children: [
        {
          level: 2,
          active: false,
          path: '/editors/ck-editors',
          title: 'CK Editors',
          type: 'link',
        },
        {
          level: 2,
          active: false,
          path: '/editors/mde-editors',
          title: 'MDE Editors',
          type: 'link',
        },
      ],
    },
    {
      id: 33,
      path: '/knowledgebase',
      title: 'Knowledgebase',
      icon: 'knowledgebase',
      type: 'link',
      active: false,
      level: 1,
    },
    {
      id: 34,
      path: '/support-ticket',
      title: 'Support Ticket',
      icon: 'support-tickets',
      active: false,
      type: 'link',
      level: 1,
    },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.verticalMenuItem);
}
