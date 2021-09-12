const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'main',
                component: () => import('pages/Index.vue'),
            },
            {
                path: '/pincodes',
                name: 'pincodes',
                component: () => import('pages/Pincodes.vue'),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue'),
    },
]

export default routes
