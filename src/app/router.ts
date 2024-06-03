import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import { CharactersPage } from '@/pages/characters';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: CharactersPage,
    },
  ],
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
