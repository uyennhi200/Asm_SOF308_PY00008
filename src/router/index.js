import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../components/IndexPage.vue';
import SignIn from '../components/SignIn.vue';
import AboutPage from '../components/AboutPage.vue';
import DetailPage from '../components/DetailPage.vue';
import ManagerPage from '../components/ManaGer.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue'






const routes = [
    { path: '/', component: IndexPage },
    { path: '/signin', component: SignIn },
    { path: '/about', component: AboutPage },
    { path: '/detail', component: DetailPage },
    { path: '/manager', component: ManagerPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage}

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;