
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '/dashboard', 
        name: 'Home',
        component: () => import('pages/Index.vue'),
        meta:{
          auth: true,
        }
      },
      {
        path: '', 
        name: 'Login',
        component: () => import('pages/Login.vue') 
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
