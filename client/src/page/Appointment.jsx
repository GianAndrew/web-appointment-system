import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge, faFileInvoice, faSchool } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal);

const Appointment = () => {
	const navigate = useNavigate();
	const [documents, setDocuments] = useState({ form137: false, form138: false, coe: false, cog: false });
	const [information, setInformation] = useState({
		first_name: '',
		last_name: '',
		middle_name: '',
		section: '',
		contact_no: '',
		school_id_no: '',
	});
	const [isOpen, setIsOpen] = useState(false);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setInformation((info) => ({ ...info, [name]: value }));
	};

	const handleCheckBox = (e) => {
		const { name, checked } = e.target;
		setDocuments((docs) => ({ ...docs, [name]: checked }));
	};

	const submitBtn = async () => {
		const value = { ...information, documents };
		const res = await fetch('http://localhost:3001/create-schedules', {
			method: 'POST',
			body: JSON.stringify(value),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
			mySwal.fire({
				title: 'Submitted Successfully',
				icon: 'success',
				text: 'Your information that you input has been saved',
				confirmButtonText: 'Okay',
				confirmButtonColor: '#3b82f6',
			});
			setIsOpen(false);
		}
	};

	return (
		<>
			{isOpen ? (
				<div className='fixed flex justify-center items-center bg-slate-500/50 w-full h-full'>
					<div className='relative w-full max-w-lg max-h-full'>
						<div className='relative bg-white rounded-lg shadow'>
							<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
								<h3 className='text-xl font-medium text-gray-900'>Preview</h3>
								<button
									type='button'
									className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
									onClick={() => setIsOpen(!isOpen)}
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
												{information.last_name}, {information.first_name} {information.middle_name}
											</span>
										</div>
										<div className='flex flex-row p-2 gap-2'>
											<span className='font-semibold'>Contact: </span>
											<span className='uppercase'>{information.contact_no}</span>
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
											<span className='uppercase'>{information.section}</span>
										</div>
										<div className='flex flex-row p-2 gap-2'>
											<span className='font-semibold'>School ID: </span>
											<span className='uppercase'>{information.school_id_no}</span>
										</div>
									</div>
								</div>
								<div className='flex flex-col text-gray-800'>
									<div className='flex justify-start items-center gap-2'>
										<FontAwesomeIcon icon={faFileInvoice} className='text-blue-700 p-2 rounded-md bg-blue-100' />
										<span className='font-bold'>Documents</span>
									</div>
									<div className='flex flex-col ms-10'>
										{Object.keys(documents)
											.filter((docs) => {
												return documents[docs] === true;
											})
											.map((d, index) => (
												<p key={index} className='text-gray-900 flex flex-col uppercase font-semibold'>
													- {d}
												</p>
											))}
									</div>
								</div>
							</div>

							<div className='flex flex-row-reverse items-center gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b'>
								<button
									type='button'
									className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
									onClick={submitBtn}
								>
									Save
								</button>
								<button
									type='button'
									className='ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900'
									onClick={() => setIsOpen(!isOpen)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}
			<section className='flex flex-col h-screen bg-gray-50'>
				<nav className='bg-white w-full shadow-sm'>
					<div className='container flex flex-wrap items-center justify-between mx-auto p-4'>
						<p className='self-center text-2xl font-semibold whitespace-nowrap'>
							Appoint.<span className='text-blue-700'>me</span>
						</p>
					</div>
				</nav>

				<div className='container mx-auto'>
					<div className='mt-10 max-w-5xl h-full mx-auto px-4 lg:px-0 flex flex-col justify-center items-center'>
						<div className='w-full p-4 mb-2'>
							<h1 className='text-4xl font-bold text-blue-700'>Make an Appointment</h1>
							<p className='text-lg text-gray-600'>Fill up the inputs with your information.</p>
						</div>
						<div className='flex flex-col bg-gray-100 w-full p-4 rounded-sm border-1 border-gray-300 shadow'>
							<div className='p-2 mt-2'>
								<p className='mb-4 mt-2 text-xl font-semibold flex justify-start items-center gap-2'>
									<FontAwesomeIcon icon={faUserLarge} className='text-blue-700 p-2' />
									<span>Name</span>
								</p>
								<div className='flex mt-1 space-x-2'>
									<input
										onChange={handleInput}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 uppercase'
										type='text'
										name='last_name'
										placeholder='Last name'
									/>
									<input
										onChange={handleInput}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 uppercase'
										type='text'
										name='first_name'
										placeholder='First name'
									/>
									<input
										onChange={handleInput}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 uppercase'
										type='text'
										name='middle_name'
										placeholder='middle name'
									/>
								</div>
							</div>
							<div className='p-2 mt-2'>
								<p className='mb-4 mt-2 text-xl font-semibold flex justify-start items-center gap-2'>
									<FontAwesomeIcon icon={faSchool} className='text-md text-blue-700 p-2' />
									<span>School Information</span>
								</p>
								<div className='flex mt-1 space-x-2'>
									<input
										onChange={handleInput}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 uppercase'
										type='text'
										name='section'
										placeholder='Section'
									/>
									<input
										onChange={handleInput}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 uppercase'
										type='text'
										name='school_id_no'
										placeholder='School ID'
									/>
									<input
										onChange={handleInput}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 uppercase'
										type='number'
										name='contact_no'
										placeholder='Contact Number'
									/>
								</div>
							</div>
							<div className='p-2 mt-2'>
								<p className='mb-4 mt-2 text-xl font-semibold flex justify-start items-center gap-2'>
									<FontAwesomeIcon icon={faFileInvoice} className='text-blue-700 p-2' />
									<span>Documents</span>
								</p>
								<div className='flex mt-1 space-x-2'>
									<div className='flex items-center mb-4 space-x-4'>
										<div className='flex flex-row justify-center items-center'>
											<input
												onChange={handleCheckBox}
												id='form137'
												name='form137'
												type='checkbox'
												className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
											/>
											<label htmlFor='form137' className='ms-2 text-sm font-medium text-gray-900'>
												Form 137
											</label>
										</div>
										<div className='flex flex-row justify-center items-center'>
											<input onChange={handleCheckBox} id='form138' name='form138' type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500' />
											<label htmlFor='form138' className='ms-2 text-sm font-medium text-gray-900'>
												Form 138
											</label>
										</div>
										<div className='flex flex-row justify-center items-center'>
											<input onChange={handleCheckBox} id='coe' name='coe' type='checkbox' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500' />
											<label htmlFor='coe' className='ms-2 text-sm font-medium text-gray-900'>
												COE
											</label>
										</div>
										<div className='flex flex-row justify-center items-center'>
											<input onChange={handleCheckBox} id='cog' type='checkbox' name='cog' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500' />
											<label htmlFor='cog' className='ms-2 text-sm font-medium text-gray-900'>
												COG
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='w-full flex flex-row-reverse p-2 mt-2 gap-2'>
							<button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2' onClick={() => setIsOpen(!isOpen)}>
								Submit
							</button>
							<button
								type='button'
								className='text-gray-900 bg-gray-200 hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
								onClick={() => {
									navigate(-1, { replace: true });
								}}
							>
								Back
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Appointment;
