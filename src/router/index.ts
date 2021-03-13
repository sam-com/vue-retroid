import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import ConsolesList from '../views/ConsolesList.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/consoles',
		name: 'Consoles',
		component: ConsolesList,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
