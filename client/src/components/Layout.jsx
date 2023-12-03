import React from 'react';
import { Outlet } from 'react-router-dom';
import Loading from './Loading';

const Layout = () => {
	return (
		<React.Suspense fallback={<Loading />}>
			<Outlet />
		</React.Suspense>
	);
};

export default Layout;
