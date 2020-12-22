import Vue from 'vue';
import Router from 'vue-router';
import Options from './Options';
import Settings from './Settings';
import History from './History';
import Feedback from './Feedback';
import Register from './Register';
import Tabs from './Tabs';
import M from '../Messages';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path: '/',
      component: Options,
      children: [
        {
          path: '',
          redirect: 'settings'
        },
        {
          path: 'tabs',
          name: 'tabs',
          component: Tabs,
          meta: { title: M.tabs }
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
          meta: { title: M.settings }
        },
        {
          path: 'history',
          name: 'history',
          component: History,
          meta: { title: M.history }
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: Feedback,
          meta: { title: M.feedback }
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
          meta: { title: M.register }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - ${M.app_name_short}`;
  next();
});

export default router;
