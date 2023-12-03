const Loading = () => {
	return (
		<div className='h-screen w-full bg-gray-50 flex flex-col items-center justify-center'>
			<div className='flex flex-row space-x-2'>
				<div className='w-5 h-5 rounded-full animate-pulse dark:bg-blue-600'></div>
				<div className='w-5 h-5 rounded-full animate-pulse dark:bg-blue-600'></div>
				<div className='w-5 h-5 rounded-full animate-pulse dark:bg-blue-600'></div>
				<div className='w-5 h-5 rounded-full animate-pulse dark:bg-blue-600'></div>
			</div>
			<p className='text-gray-400 text-sm mt-4'>Loading</p>
		</div>
	);
};

export default Loading;
