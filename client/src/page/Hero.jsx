import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Hero = () => {
	return (
		<section className='flex flex-col w-full h-screen bg-gray-50'>
			<Navbar />

			<div className='h-1/2 w-full'>
				<div className='container mx-auto h-full flex flex-col justify-center items-center'>
					<h1 className='text-blue-700 text-center text-4xl mb-2 font-bold px-2 md:text-5xl lg:text-6xl lg:px-0'>School Appointment</h1>
					<p className='text-gray-500 text-center text-sm max-w-2xl my-2 px-2 md:text-md lg:text-lg lg:px-0'>
						Book school appointments online for convenience and efficiency. Save time by scheduling meetings with teachers hassle-free. Stay organized with easy access to appointment details and
						receive timely reminders.
					</p>
					<div className='flex flex-row'>
						<Link to={'/appointment'} type='button' className='text-gray-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mt-5'>
							Book Now!
						</Link>
						<Link to={'/status'} type='button' className='text-gray-800 border border-transparent hover:border-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mt-5'>
							Check Status
						</Link>
					</div>
				</div>
			</div>
			<div className='h-1/2 w-full bg-gray-100'>
				<div className='h-full flex justify-center items-center container mx-auto'>
					<div className='max-w-screen-xl mx-auto px-4 text-gray-600 gap-12 md:px-8 lg:flex'>
						<div className='max-w-md'>
							<h3 className='text-blue-700 text-3xl font-semibold sm:text-4xl'>Let’s connect</h3>
							<p className='mt-3'>We’re here to help and answer any question you might have, We look forward to hearing from you .</p>
						</div>
						<div>
							<ul className='mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0'>
								<li className='space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none'>
									<div className='w-12 h-12 rounded-full border flex items-center justify-center text-gray-700'>
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
											/>
										</svg>
									</div>
									<h4 className='text-gray-800 text-lg font-medium xl:text-xl'>Contact No.</h4>
									<p>+63 987654321</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
