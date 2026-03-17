import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { AdminPages } from '@/admin/pages/AdminPages';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';

//const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage').then(module => ({ default: module.SearchPage })))
const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));


export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'heroes/1',
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPages />
            }
        ]
    }
])