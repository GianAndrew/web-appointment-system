import { lazy } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';

const NotFound = lazy(() => import('./page/NotFound.jsx'));
const Hero = lazy(() => import('./page/Hero.jsx'));
const Appointment = lazy(() => import('./page/Appointment.jsx'));
const Dashboard = lazy(() => import('./page/Dashboard.jsx'));
const CheckStatus = lazy(() => import('./page/CheckStatus.jsx'));

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/' element={<Layout />}>
				<Route index element={<Hero />} />
				<Route path='/appointment' element={<Appointment />} />
				<Route path='/status' element={<CheckStatus />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Route>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
