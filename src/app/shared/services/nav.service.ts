import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Menu {
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
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public language: boolean = false;

  constructor() {}

  MENUITEM: Menu[] = [
    {
      headTitle1: 'Dashboard',
      headTitle2: 'Real Time Status',
      items: [
        {
          title: 'Dashboard',
          icon: 'home',
          type: 'sub',
          active: true,
          children: [
            { path: '/dashboard', title: 'Authors', type: 'link' },
            { path: '/dashboard/readers', title: 'Readers', type: 'link' },
            { path: '/dashboard/agents', title: 'Agents', type: 'link' },
          ],
        },
      ],
    },
    {
      headTitle1: 'Authors',
      headTitle2: 'Create the art ',
      items: [
        {
          title: 'Projects',
          icon: 'project',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/projects/project-list',
              title: 'Project List',
              type: 'link',
            },
            {
              path: '/projects/create-new',
              title: 'Create New',
              type: 'link',
            },
          ],
        },
      ],
    },
    {
      headTitle1: 'CrowdAgent',
      headTitle2: 'Ready To Go To Work ',
      items: [
        {
          title: 'PiQue',
          icon: 'eye',
          type: 'link',
          path: '/reader',
          bookmark: true,
          children: [
            {
              path: '/crowdagent/swiper',
              title: 'piQue Titles',
              type: 'link',
            },
            {
              path: '/crowdagent/pique',
              title: 'Review Content',
              type: 'link',
            },
          ],
        },
        /*
        {
          title: 'Ecommerce',
          icon: 'ecommerce',
          type: 'sub',
          active: false,
          children: [
            { path: '/ecommerce/product', title: 'Product', type: 'link' },
            {
              path: '/ecommerce/product-page',
              title: 'Product Page',
              type: 'link',
            },
            {
              path: '/ecommerce/product-list',
              title: 'Product List',
              type: 'link',
            },
            {
              path: '/ecommerce/payment-detail',
              title: 'Payment Details',
              type: 'link',
            },
            {
              path: '/ecommerce/order-history',
              title: 'Order History',
              type: 'link',
            },
            { path: '/ecommerce/invoice', title: 'Invoice', type: 'link' },
            { path: '/ecommerce/cart', title: 'Cart', type: 'link' },
            { path: '/ecommerce/wishlist', title: 'Wishlist', type: 'link' },
            { path: '/ecommerce/checkout', title: 'Checkout', type: 'link' },
            { path: '/ecommerce/pricing', title: 'Pricing', type: 'link' },
          ],
        },
        {
          title: 'Email',
          icon: 'email',
          type: 'sub',
          active: false,
          children: [
            { path: '/email/email-app', title: 'Email App', type: 'link' },
            {
              path: '/email/email-compose',
              title: 'Email Compose',
              type: 'link',
            },
          ],
        },
        {
          title: 'Chat',
          icon: 'chat',
          type: 'sub',
          active: false,
          children: [
            { path: '/chat/chat-app', title: 'Chat App', type: 'link' },
            { path: '/chat/video-chat', title: 'Video App', type: 'link' },
          ],
        },
        {
          title: 'Users',
          icon: 'user',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/users/users-profile',
              title: 'Users Profile',
              type: 'link',
            },
            { path: '/users/users-edit', title: 'Users Edit', type: 'link' },
            { path: '/users/users-card', title: 'Users Cards', type: 'link' },
          ],
        },
        {
          title: 'Bookmarks',
          icon: 'bookmark',
          type: 'link',
          path: '/bookmarks',
        },
        {
          title: 'Contacts',
          icon: 'contact',
          type: 'link',
          path: '/contacts',
          bookmark: true,
        },
        {
          title: 'Tasks',
          icon: 'task',
          type: 'link',
          path: '/tasks',
        },
        {
          title: 'Calander',
          icon: 'calendar',
          type: 'link',
          path: '/calander',
        },
        {
          title: 'Social Apps',
          icon: 'social',
          type: 'link',
          path: '/social-app',
        },
        {
          title: 'To-Do',
          icon: 'to-do',
          type: 'link',
          path: '/todo',
        },
        {
          title: 'Search Result',
          icon: 'search',
          type: 'link',
          path: '/search-result',
        },
      */
      ],
    },
    /*{
      headTitle1: 'Forms & Table',
      headTitle2: 'Ready To Use Forms & Tables',
      items: [
        {
          title: 'Form Contorls',
          icon: 'form',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/form-control/form-validation',
              title: 'Form Validation',
              type: 'link',
            },
            {
              path: '/form-control/base-input',
              title: 'Base Input',
              type: 'link',
            },
            {
              path: '/form-control/checkbox-radio',
              title: 'Checkbox & Radio',
              type: 'link',
            },
            {
              path: '/form-control/input-groups',
              title: 'Input Groups',
              type: 'link',
            },
            {
              path: '/form-control/mega-options',
              title: 'Mega Options',
              type: 'link',
            },
          ],
        },
        {
          title: 'Form Widgets',
          icon: 'knowledgebase',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/form-widgets/datepicker',
              title: 'Datepicker',
              type: 'link',
            },
            {
              path: '/form-widgets/touchspin',
              title: 'Touchspin',
              type: 'link',
            },
            { path: '/form-widgets/select2', title: 'Select2', type: 'link' },
            { path: '/form-widgets/switch', title: 'Switch', type: 'link' },
            {
              path: '/form-widgets/typeahead',
              title: 'Typeahead',
              type: 'link',
            },
            {
              path: '/form-widgets/clipboard',
              title: 'Clipbard',
              type: 'link',
            },
          ],
        },
        {
          title: 'Bootstrap Tables',
          icon: 'table',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/bootstrap-tables/basic-tables',
              title: 'Basic Tables',
              type: 'link',
            },
            {
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
        },
      ],
    },
    {
      headTitle1: 'Components',
      headTitle2: 'Ui Components & Elements',
      items: [
        {
          title: 'UI Kits',
          icon: 'ui-kits',
          type: 'sub',
          active: false,
          children: [
            { path: '/ui-kits/typography', title: 'Typography', type: 'link' },
            { path: '/ui-kits/avatars', title: 'Avatars', type: 'link' },
            {
              path: '/ui-kits/helper-classes',
              title: 'Helper Classes',
              type: 'link',
            },
            { path: '/ui-kits/grid', title: 'Grid', type: 'link' },
            { path: '/ui-kits/tag-pills', title: 'Tag & Pills', type: 'link' },
            { path: '/ui-kits/progress', title: 'Progress', type: 'link' },
            { path: '/ui-kits/modal', title: 'Modal', type: 'link' },
            { path: '/ui-kits/alert', title: 'Alert', type: 'link' },
            { path: '/ui-kits/popover', title: 'Popover', type: 'link' },
            { path: '/ui-kits/tooltip', title: 'Tooltip', type: 'link' },
            { path: '/ui-kits/dropdown', title: 'Dropdown', type: 'link' },
            { path: '/ui-kits/accordion', title: 'Accordion', type: 'link' },
            { path: '/ui-kits/tabs', title: 'Tabs', type: 'link' },
            { path: '/ui-kits/lists', title: 'Lists', type: 'link' },
          ],
        },
        {
          title: 'Bonus UI',
          icon: 'bonus-kit',
          type: 'sub',
          active: false,
          children: [
            { path: '/bonus-ui/toasts', title: 'Toast', type: 'link' },
            { path: '/bonus-ui/rating', title: 'Rating', type: 'link' },
            { path: '/bonus-ui/dropzone', title: 'Dropzone', type: 'link' },
            {
              path: '/bonus-ui/sweetalert2',
              title: 'SweetAlert2',
              type: 'link',
            },
            {
              path: '/bonus-ui/owl-carousel',
              title: 'Owl carousel',
              type: 'link',
            },
            { path: '/bonus-ui/ribbons', title: 'Ribbons', type: 'link' },
            { path: '/bonus-ui/pagination', title: 'Pagination', type: 'link' },
            { path: '/bonus-ui/breadcrumb', title: 'Breadcrumb', type: 'link' },
            {
              path: '/bonus-ui/range-slider',
              title: 'Range Slider',
              type: 'link',
            },
            {
              path: '/bonus-ui/image-cropper',
              title: 'Image Cropper',
              type: 'link',
            },
            { path: '/bonus-ui/basic-card', title: 'Basic Card', type: 'link' },
            {
              path: '/bonus-ui/creative-card',
              title: 'Creative Card',
              type: 'link',
            },
            { path: '/bonus-ui/timeline', title: 'Timeline', type: 'link' },
          ],
        },
        {
          title: 'Icons',
          icon: 'icons',
          type: 'sub',
          active: false,
          children: [
            { path: '/icon/flag-icon', title: 'Flag Icon', type: 'link' },
            {
              path: '/icon/fontawesome-icon',
              title: 'Fontawesome Icon',
              type: 'link',
            },
            { path: '/icon/ico-icon', title: 'Ico Icon', type: 'link' },
            { path: '/icon/thimify-icon', title: 'Themify Icon', type: 'link' },
            { path: '/icon/feather-icon', title: 'Feather Icon', type: 'link' },
            { path: '/icon/whether-icon', title: 'Whether Icon', type: 'link' },
          ],
        },
        {
          title: 'Buttons',
          icon: 'button',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/button/default-style',
              title: 'Default Style',
              type: 'link',
            },
            { path: '/button/flat-style', title: 'Flat Style', type: 'link' },
            { path: '/button/edge-style', title: 'Edge Style', type: 'link' },
            {
              path: '/button/raised-style',
              title: 'Raised Style',
              type: 'link',
            },
            {
              path: '/button/button-group',
              title: 'Button Group',
              type: 'link',
            },
          ],
        },
        {
          title: 'Charts',
          icon: 'charts',
          type: 'sub',
          active: false,
          children: [
            { path: '/charts/apex-chart', title: 'Apex Chart', type: 'link' },
            {
              path: '/charts/google-chart',
              title: 'Google Chart',
              type: 'link',
            },
            { path: '/charts/chartjs', title: 'Chartjs Chart', type: 'link' },
            { path: '/charts/chartist', title: 'Chartist Chart', type: 'link' },
          ],
        },
      ],
    },
    {
      headTitle1: 'Pages',
      headTitle2: 'All Neccesory Pages Added',
      items: [
        {
          path: '/sample-page',
          title: 'Sample Page',
          icon: 'sample-page',
          type: 'link',
        },
        {
          title: 'Error Pages',
          type: 'sub',
          icon: 'landing-page',
          active: false,
          children: [
            {
              path: '/error-page/error400',
              title: 'Error Page 400',
              type: 'link',
            },
            {
              path: '/error-page/error401',
              title: 'Error Page 401',
              type: 'link',
            },
            {
              path: '/error-page/error403',
              title: 'Error Page 403',
              type: 'link',
            },
            {
              path: '/error-page/error404',
              title: 'Error Page 404',
              type: 'link',
            },
            {
              path: '/error-page/error500',
              title: 'Error Page 500',
              type: 'link',
            },
            {
              path: '/error-page/error503',
              title: 'Error Page 503',
              type: 'link',
            },
          ],
        },
        {
          title: 'Authentication',
          type: 'sub',
          icon: 'board',
          active: false,
          children: [
            {
              path: '/authentication/simple',
              title: 'Login Simple',
              type: 'link',
            },
            {
              path: '/authentication/image-one',
              title: 'Login with Bg image',
              type: 'link',
            },
            {
              path: '/authentication/image-two',
              title: 'Login with Image two',
              type: 'link',
            },
            {
              path: '/authentication/validation',
              title: 'Login with Validation',
              type: 'link',
            },
            {
              path: '/authentication/tooltip',
              title: 'Login with Tooltip',
              type: 'link',
            },
            {
              path: '/authentication/login-sweetalert',
              title: 'Login with Sweetalert',
              type: 'link',
            },
            {
              path: '/authentication/register-simple',
              title: 'Register Simple',
              type: 'link',
            },
            {
              path: '/authentication/register-image-one',
              title: 'Register with Bg image',
              type: 'link',
            },
            {
              path: '/authentication/register-image-two',
              title: 'Register with image two',
              type: 'link',
            },
            {
              path: '/authentication/unlock-user',
              title: 'Unlock User',
              type: 'link',
            },
            {
              path: '/authentication/forgot-password',
              title: 'Forgot Password',
              type: 'link',
            },
            {
              path: '/authentication/reset-password',
              title: 'Reset Password',
              type: 'link',
            },
            {
              path: '/authentication/maintenance',
              title: 'Maintenance',
              type: 'link',
            },
          ],
        },
        {
          title: 'Coming Soon',
          type: 'sub',
          icon: 'faq',
          active: false,
          children: [
            {
              path: '/coming-soon/coming-simple',
              title: 'Coming Simple',
              type: 'link',
            },
            {
              path: '/coming-soon/coming-with-bg-video',
              title: 'Coming with Bg video',
              type: 'link',
            },
            {
              path: '/coming-soon/coming-with-bg-image',
              title: 'Coming with Bg Image',
              type: 'link',
            },
          ],
        },
        {
          title: 'Email templates',
          type: 'sub',
          icon: 'email',
          active: false,
          children: [
            {
              path: 'https://admin.pixelstrap.com/boho/template/basic-template.html',
              title: 'Basic Email',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/boho/template/email-header.html',
              title: 'Basic With Header',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/boho/template/template-email.html',
              title: 'Ecommerce Template',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/boho/template/template-email-2.html',
              title: 'Email Template 2',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/boho/template/ecommerce-templates.html',
              title: 'Ecommerce Email',
              type: 'extTabLink',
            },
            {
              path: 'https://admin.pixelstrap.com/boho/template/email-order-success.html',
              title: 'Order Success',
              type: 'extTabLink',
            },
          ],
        },
      ],
    },
    {
      headTitle1: 'Miscellaneous',
      headTitle2: 'Bouns Pages & Apps',
      items: [
        {
          title: 'Gallery',
          icon: 'gallery',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/gallery/gallery-grid',
              title: 'Gallery Grid',
              type: 'link',
            },
            {
              path: '/gallery/gallery-grid-desc',
              title: 'Gallery Grid Desc',
              type: 'link',
            },
            {
              path: '/gallery/masonry-gallery',
              title: 'Masonry Gallery',
              type: 'link',
            },
            {
              path: '/gallery/masonry-with-desc',
              title: 'Masonry With Desc',
              type: 'link',
            },
            {
              path: '/gallery/hover-effects',
              title: 'Hover Effect',
              type: 'link',
            },
          ],
        },
        {
          title: 'Blog',
          icon: 'blog',
          type: 'sub',
          active: false,
          children: [
            { path: '/blog/blog-details', title: 'Blog Details', type: 'link' },
            { path: '/blog/blog-single', title: 'Blog Single', type: 'link' },
            { path: '/blog/add-post', title: 'Add Post', type: 'link' },
          ],
        },
        {
          path: '/faq',
          title: 'FAQ',
          icon: 'faq',
          type: 'link',
          active: false,
        },
        {
          title: 'Job Search',
          icon: 'job-search',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/job-search/cards-view',
              title: 'Card View',
              type: 'link',
            },
            { path: '/job-search/list-view', title: 'List View', type: 'link' },
            {
              path: '/job-search/job-details',
              title: 'Job Details',
              type: 'link',
            },
            { path: '/job-search/apply', title: 'Apply', type: 'link' },
          ],
        },
        {
          title: 'Learning',
          icon: 'learning',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/learning/learning-list',
              title: 'Learning List',
              type: 'link',
            },
            {
              path: '/learning/detailed-course',
              title: 'Detailed Course',
              type: 'link',
            },
          ],
        },
        {
          title: 'Maps',
          icon: 'maps',
          type: 'sub',
          active: false,
          children: [
            { path: '/maps/google-map', title: 'Google Map', type: 'link' },
            { path: '/maps/leaflet-map', title: 'Leaflet Maps', type: 'link' },
          ],
        },
        {
          title: 'Editors',
          icon: 'editors',
          active: false,
          type: 'sub',
          children: [
            { path: '/editors/ck-editors', title: 'CK Editors', type: 'link' },
            {
              path: '/editors/mde-editors',
              title: 'MDE Editors',
              type: 'link',
            },
          ],
        },
        {
          path: '/knowledgebase',
          title: 'Knowledgebase',
          icon: 'knowledgebase',
          type: 'link',
          active: false,
        },
        {
          path: '/support-ticket',
          title: 'Support Ticket',
          icon: 'support-tickets',
          active: false,
          type: 'link',
        },
      ],
    },*/
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEM);
}
