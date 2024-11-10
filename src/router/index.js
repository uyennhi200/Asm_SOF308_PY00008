import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import IndexPage from '../components/IndexPage.vue';
import AboutPage from '../components/AboutPage.vue';
import DetailPage from '../components/DetailPage.vue'






const routes = [
    { path: '/signin', component: SignIn },
    { path: '/index', component: IndexPage },
    { path: '/about', component: AboutPage },
    { path: '/detail', component: DetailPage }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;