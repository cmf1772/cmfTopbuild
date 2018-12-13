//引入一级路由
import Login from '../routes/login'
import MainPage from '../routes/mainPage'
import Detail from '../routes/detail'
import SongsDetail from '../routes/songsDetail/songsDetail'
import DistinguishPage from '../routes/DistinguishPage/DistinguishPage'

//引入二级路由
import Account from '../routes/account/index'
import Discover from '../routes/discover/index'
import Friend from '../routes/friend/index'
import My from '../routes/my/index'
import Video from '../routes/video/index'
import EveryDay from '../routes/every_day/everyDay'
import Search from '../routes/search/search'
//三级路由
import Anchor from '../routes/account/anchor/anchor'
import Recommend from '../routes/account/recommend/recommend'

export default {
    routes: [{
        path: '/login',
        component: Login,
    }, {
        path: '/DistinguishPage',
        component: DistinguishPage,
    }, {
        path: '/detail/:id?',
        component: Detail,
    }, {
        path: '/songsDetail/:id?',
        component: SongsDetail,
    }, {
        path: '/mainPage',
        component: MainPage,
        children: [{
            path: '/mainPage/account',
            component: Account,
            children: [{
                path: '/mainPage/account/anchor',
                component: Anchor
            }, {
                path: '/mainPage/account/recommend',
                component: Recommend
            }]
        }, {
            path: '/mainPage/discover',
            component: Discover
        }, {
            path: '/mainPage/my',
            component: My
        }, {
            path: '/mainPage/video',
            component: Video
        }, {
            path: '/mainPage/friend',
            component: Friend
        }, {
            path: '/mainPage/friend',
            component: EveryDay
        }, {
            path: '/mainPage/search',
            component: Search
        }]
    }, {
        path: '/',
        redirect: '/mainPage/account/anchor'
    }]
}