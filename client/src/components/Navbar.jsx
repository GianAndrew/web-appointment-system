import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='bg-white w-full shadow-sm'>
			<div className='container flex flex-wrap items-center justify-between mx-auto p-4'>
				<p className='self-center text-2xl font-semibold whitespace-nowrap'>
					Appoint.<span className='text-blue-700'>me</span>
				</p>

				<div className='flex md:order-2 space-x-3 md:space-x-0 '>
					<Link to={'/dashboard'} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center'>
						Go to Admin
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
