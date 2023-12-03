import NewTask from './NewTask.jsx';

export default function Tasks({ tasks, onAdd, onDelete }) {
	return (
		<section>
			<h2 className='text-2sl font-bold text-stone-700 mb-4'>Twoja lista zadań</h2>
			<NewTask onAdd={onAdd} />
			{/* <p className='text-stone-800 my-4'> nie ma tu żadnych zadań</p>

			<ul className='p-4 mt-8 rounded-md bg-stone-100'>
				{tasks.map((task) => (
					<li key={task.id} className='flex justify-between my-4'>
						<span>{task.text}</span>
						<button className='text-stona700 hover:text-red-500'>
							Delete task
						</button>
					</li>
				))}
			</ul> */}

			{tasks.length === 0 && (
				<p className='text-stone-800 my-4'> Wygląda na to, że nie masz jeszcze żadnych zadań</p>
			)}
			{tasks.length > 0 && (
				<ul className='p-4 mt-8 rounded-md bg-stone-100'>
					{tasks.map((task) => (
						<li key={task.id} className='flex justify-between my-4'>
							<span>{task.text}</span>
							<button
								className='text-stona700 hover:text-red-500'
								//onClick={onDelete}> tak nie możemy przekazać ponieważ musimy pzrekazac tez id taska
								//musimy użyc funckji i tam przekazać taska do funkcji w App
								onClick={() => onDelete(task.id)}>
								Usuń zadanie
							</button>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
