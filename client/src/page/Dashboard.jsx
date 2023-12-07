import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge, faSchool, faFileInvoice, faClock } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';

const mySwal = withReactContent(Swal);

const Dashboard = () => {
	const [appointment, setAppointment] = useState([]);
	const [isOpenInfo, setIsOpenInfo] = useState(false);
	const [isOpenSched, setIsOpenSched] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [date, setDate] = useState(new Date());
	const [userId, setUserId] = useState(0);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState('');

	const handleSeeInfoModal = (data) => {
		setUserInfo(data);
		setIsOpenInfo(true);
	};
	const handleSetScheduleModal = (data) => {
		setUserId(data.id);
		setIsOpenSched(true);
	};

	const handleSetScheduleSave = async () => {
		const result = await fetch(`http://localhost:3001/set-schedule/${userId}`, {
			method: 'POST',
			body: JSON.stringify({ scheduled_at: date }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (result.ok) {
			mySwal
				.fire({
					title: 'Submitted Successfully',
					icon: 'success',
					text: 'Schedule that you set to your customer has been saved',
					confirmButtonText: 'Okay',
					confirmButtonColor: '#3b82f6',
				})
				.then((result) => {
					if (result.value) {
						document.location.reload();
					}
				});
			setIsOpenSched(false);
		}
	};

	useEffect(() => {
		const fetchAllAppoiment = async () => {
			const result = await fetch('http://localhost:3001/schedules');
			const data = await result.json();
			if (result.ok) {
				setIsError(false);
				setError('');
				return setAppointment(data);
			} else {
				setIsError(true);
				setError('this field is empty.');
				throw new Error('this field is empty.');
			}
		};
		fetchAllAppoiment();
	}, []);

	console.log({ isArray: Array.isArray(appointment), length: appointment.length === 0 });

	return (
		<>
			{isOpenSched ? (
				<div className='fixed flex justify-center items-center bg-slate-500/50 w-full h-full'>
					<div className='relative w-full max-w-lg max-h-full'>
						<div className='relative bg-white rounded-lg shadow'>
							<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
								<h3 className='text-xl font-medium text-gray-900'>Set Schedule #{userId}</h3>
								<button
									type='button'
									className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
									onClick={() => setIsOpenSched(!isOpenSched)}
								>
									<svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
										<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
									</svg>
									<span className='sr-only'>Close modal</span>
								</button>
							</div>

							{/* modal content */}
							<div className='p-4 md:p-5 space-y-4'>
								<div className='flex flex-row text-gray-800'>
									<div className='flex justify-start items-center gap-2'>
										<FontAwesomeIcon icon={faClock} className='text-blue-700 p-2 rounded-md bg-blue-100' />
										<span className='font-bold'>Date</span>
									</div>
									<div className='ms-8'>
										<div className='flex flex-row p-2 gap-2'>
											<DatePicker
												className='bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full flex justify-center items-center text-center py-2'
												selected={date}
												onChange={(d) => setDate(d)}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className='flex flex-row-reverse items-center gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b'>
								<button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5' onClick={handleSetScheduleSave}>
									Save
								</button>
								<button
									type='button'
									className='ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900'
									onClick={() => setIsOpenSched(!isOpenSched)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}

			{isOpenInfo ? (
				<div className='fixed flex justify-center items-center bg-slate-500/50 w-full h-full'>
					<div className='relative w-full max-w-lg max-h-full'>
						<div className='relative bg-white rounded-lg shadow'>
							<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
								<h3 className='text-xl font-medium text-gray-900'>Preview</h3>
								<button
									type='button'
									className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
									onClick={() => setIsOpenInfo(!isOpenInfo)}
								>
									<svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
										<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
									</svg>
									<span className='sr-only'>Close modal</span>
								</button>
							</div>

							{/* modal content */}
							<div className='p-4 md:p-5 space-y-4'>
								<div className='flex flex-col text-gray-800'>
									<div className='flex justify-start items-center gap-2'>
										<FontAwesomeIcon icon={faUserLarge} className='text-blue-700 p-2 rounded-md bg-blue-100' />
										<span className='font-bold'>Information</span>
									</div>
									<div className='ms-8'>
										<div className='flex flex-row p-2 gap-2'>
											<span className='font-semibold'>Name: </span>
											<span className='uppercase'>
												{userInfo?.last_name}, {userInfo?.first_name} {userInfo?.middle_name}
											</span>
										</div>
										<div className='flex flex-row p-2 gap-2'>
											<span className='font-semibold'>Contact: </span>
											<span className='uppercase'>{userInfo?.contact_no}</span>
										</div>
									</div>
								</div>
								<div className='flex flex-col text-gray-800'>
									<div className='flex justify-start items-center gap-2'>
										<FontAwesomeIcon icon={faSchool} className='text-blue-700 p-2 rounded-md bg-blue-100' />
										<span className='font-bold'>School Information</span>
									</div>
									<div className='ms-8'>
										<div className='flex flex-row p-2 gap-2'>
											<span className='font-semibold'>Section: </span>
											<span className='uppercase'>{userInfo?.section}</span>
										</div>
										<div className='flex flex-row p-2 gap-2'>
											<span className='font-semibold'>School ID: </span>
											<span className='uppercase'>{userInfo?.school_id_no}</span>
										</div>
									</div>
								</div>
								<div className='flex flex-col text-gray-800'>
									<div className='flex justify-start items-center gap-2'>
										<FontAwesomeIcon icon={faFileInvoice} className='text-blue-700 p-2 rounded-md bg-blue-100' />
										<span className='font-bold'>Documents</span>
									</div>
									<div className='flex flex-col justify-center items-start ms-10'>
										<div className='bg-orange-200 px-4 py-2 rounded-lg border border-orange-400'>
											{Object.keys(userInfo?.documents)
												.filter((docs) => {
													return userInfo?.documents[docs] === true;
												})
												.map((d, index) => (
													<p key={index} className='text-gray-900 flex flex-col uppercase font-semibold'>
														- {d}
													</p>
												))}
										</div>
									</div>
								</div>
								<div className='flex flex-col text-gray-800'>
									<div className='flex justify-start items-center gap-2'>
										<FontAwesomeIcon icon={faClock} className='text-blue-700 p-2 rounded-md bg-blue-100' />
										<span className='font-bold'>Creation</span>
									</div>
									<div className='ms-8'>
										<div className='flex flex-row p-2 gap-2'>
											<span className='font-semibold'>Created At : </span>
											<span className='uppercase'>{userInfo?.created_at}</span>
										</div>
									</div>
								</div>
							</div>

							<div className='flex flex-row-reverse items-center gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b'>
								<button
									type='button'
									className='ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900'
									onClick={() => setIsOpenInfo(!isOpenInfo)}
								>
									Okay
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}

			<section className='min-h-screen w-full flex flex-col bg-gray-100'>
				<nav className='bg-white w-full shadow-sm'>
					<div className='container flex flex-wrap items-center justify-between mx-auto p-4'>
						<p className='self-center text-2xl font-semibold whitespace-nowrap'>
							Appoint.<span className='text-blue-700'>me</span>
						</p>
						<div className='flex md:order-2 space-x-3 md:space-x-0 '>
							<Link to={'/'} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center'>
								Home
							</Link>
						</div>
					</div>
				</nav>
				<div className='container px-4 mx-auto'>
					<div className='max-w-7xl mx-auto flex flex-col mt-6'>
						<div className='w-full p-4 mb-2'>
							<h1 className='text-4xl font-bold text-blue-700'>Admin Dashboard</h1>
							<p className='text-lg text-gray-600'>See the information and set schedule of your customer.</p>
						</div>
						<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
							<div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
								<div className='overflow-hidden border border-gray-200 md:rounded-lg'>
									<table className='min-w-full divide-y divide-gray-200'>
										<thead className='bg-gray-50'>
											<tr>
												<th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
													No.
												</th>

												<th scope='col' className='px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
													Name
												</th>

												<th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
													Status
												</th>

												<th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
													Action
												</th>
											</tr>
										</thead>
										<tbody className='bg-white divide-y divide-gray-200'>
											{appointment.length === 0 ? (
												<tr>
													<td colSpan={4} className='py-4 text-center text-sm text-gray-500'>
														No appointment.
													</td>
												</tr>
											) : Array.isArray(appointment) ? (
												appointment.map((appmnt, index) => (
													<tr key={appmnt?.id}>
														<td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
															<span className='font-medium text-gray-800'>#{index + 1}</span>
														</td>

														<td className='px-4 py-4 text-sm whitespace-nowrap'>
															<span className='text-gray-500 uppercase'>
																{appmnt?.last_name}, {appmnt?.first_name} {appmnt?.middle_name}.
															</span>
														</td>
														<td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
															{appmnt.status === 'pending' ? (
																<div className='inline font-semibold px-4 py-1 text-sm rounded-full capitalize text-orange-500  bg-orange-100/60'>{appmnt?.status}</div>
															) : appmnt.status === 'completed' ? (
																<div className='inline font-semibold px-4 py-1 text-sm rounded-full capitalize text-green-500  bg-green-100/60'>{appmnt?.status}</div>
															) : null}
														</td>
														<td className='px-4 py-4 text-sm whitespace-nowrap'>
															<div className='flex gap-2'>
																<button
																	className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
																	onClick={() => handleSeeInfoModal(appmnt)}
																>
																	See info
																</button>
																<button
																	className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5'
																	onClick={() => handleSetScheduleModal(appmnt)}
																>
																	Set Schedule
																</button>
															</div>
														</td>
													</tr>
												))
											) : (
												<tr>
													<td colSpan={4} className='py-4 text-center text-sm text-gray-500'>
														Something went wrong
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Dashboard;
