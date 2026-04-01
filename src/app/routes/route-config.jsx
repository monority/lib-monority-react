import { HomePage } from '@/features/home/HomePage'
import { NotFoundPage } from '@/features/not-found/NotFoundPage'
import { PlaygroundPage } from '@/features/playground/PlaygroundPage'
import { ShowcasePage } from '@/features/showcase/ShowcasePage'

export const appRoutes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/playground',
        element: <PlaygroundPage />,
    },
    {
        path: '/showcase',
        element: <ShowcasePage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]
