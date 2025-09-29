import { lazy, Suspense } from "react";
import { createBrowserRouter, useOutlet, useLocation} from "react-router-dom";
/* router  - компонент оборачивающий все страницы в приложении */

import AppHeader from "../appHeader/AppHeader";
//import { MainPage, ComicsPage, SingleComicPage } from "../pages"; // при обращении к папке вебпэк ищет индекс js
import Spinner from "../spinner/Spinner";
import { SwitchTransition, CSSTransition} from "react-transition-group";

import './app.scss'
import { PatternComicPage } from "../patternComicPage/patternComicPage";
import { PatternCharPage } from "../patternCharPage/patternCharPage";

const Page404 = lazy(() => import('../pages/404')); // default export + использование компонента Suspense4
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const IntroPage = lazy(() => import('../pages/IntroPage'));
const MainPage = lazy(() => import('../pages/MainPage'));

const routes = [
    {path: '/', element: <MainPage/>, name:'Main'},
    {path: '/comics', element: <ComicsPage/>, name:'ComicsList'},
    {path: '/comics/:dataId', element: <IntroPage type='comic' Component={PatternComicPage}/>, name:'Comic'},
    {path: '/:dataId', element: <IntroPage type='char' Component={PatternCharPage}/>, name:'Characters'},
    {path: '*', element: <Page404/>, name:'Error'}
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: routes.map(route => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element
        }))
    },
])


function App() {
    const location = useLocation()
    const currentOutlet = useOutlet()

    return (
            <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <SwitchTransition>
                        <CSSTransition
                            key={location.pathname}
                            timeout={300}
                            classNames='page'
                            unmountOnExit>
                            {(state) => (
                            <div className='page'>{currentOutlet}</div>
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                </Suspense>
            </main>
        </div>
    )
}


export default router;