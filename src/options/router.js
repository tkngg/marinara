import Vue from 'vue';
import Router from 'vue-router';
import Options from './Options';
import Settings from './Settings';
import History from './History';
import Feedback from './Feedback';
import Register from './Register';
import Tabs from './Tabs';
import Daily from './components/Daily';
import Weekly from './components/Weekly';
import Monthly from './components/Monthly';
import Summary from './components/Summary';
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
    },
    {
      path: '/history',
      component: History,
      children: [
        {
          path: '',
          redirect: 'summary'
        },
        {
          path: 'summary',
          name: 'summary',
          component: Summary,
          meta: 'Summary Statistics'
        },
        {
          path: 'daily',
          name: 'daily',
          component: Daily,
          meta: 'Daily Statistics'
        },
        {
          path: 'weekly',
          name: 'weekly',
          component: Weekly,
          meta: 'Weekly Statistics'
        },
        {
          path: 'monthly',
          name: 'monthly',
          component: Monthly,
          meta: 'Monthly Statistics'
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - ${M.app_name_short}`;
  next();
});

export default router;
