import Tasks from './Tasks';

export default function SelectedProject({
	project,
	onDeleteProject,
	onAddTask,
	onDeleteTask,
	tasks,
}) {
	//wszystkie dane które będą wyświetlane będą odbierane jako rekwizyty czyli propsy, w nawiasach {} wpisuje project żeby można było wpisac project.
	// i tam do buttona który jest także tytułem naszgo projectu dodajemy pod onClicka tego propsa
	//potem dodajemy jeszcze propsa w ProjectSidebar z id zeby podświetlic projekt który został wybrany
	// na końcu w  App musimy wyświetlic wybrany prjekt:
	//1. użyc nowo dodanego komponentu czyli SelectedProject.jsx

	const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}); //zformatowana data

	//console.log('newLetter  ' + newLetter);
	return (
		<div className='w-[35rem] mt-16'>
			<header className=' pb-4 mb-4 border-b-2 border-stone-300'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold text-stone-600 mb-2'>
						{project.title}
					</h1>
					<button
						className='text-stone-600 hover:text-stone-950'
						onClick={onDeleteProject}>
						Usuń
					</button>
					{/* ten button musi zmieniac stan w naszym komponencie, dlatego w App.js dodajemy obsługę handleSelectedProject */}
				</div>
				<p className='mb-4 text-stone-400'>{formattedDate}</p>
				<p className='text-stone-600 whitespace-pre-wrap'>
					{project.description}
				</p>
			</header>
			<Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
		</div>
	);
}
