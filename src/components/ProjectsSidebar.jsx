import Button from './Button.jsx';
export default function ProjectsSidebar({
	onStartAddProject,
	projects,
	onSelectProject,
	selectedProjectId,
}) {
	return (
		<aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
			<h2 className='mb-8 font-bold uppercase mdtext-xl text-stone-200'>
				Twoje projekty
			</h2>
			<div>
				<Button onClick={onStartAddProject}>Dodaj projekt</Button>
			</div>
			<ul className='mt-8'>
				{projects.map((project) => {
					let cssClasses;
					if (project.id === selectedProjectId) {
						cssClasses =
							' w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-700 hover:bg-stone-800 text-stone-100 bg-stone-600';
					} else {
						cssClasses =
							' text-stone-300 w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-700 hover:bg-stone-800';
					}

					return (
						// console.log(project.id),
						// console.log(selectedProjectId),

						<li key={project.id}>
							<button
								className={cssClasses}
								onClick={() => onSelectProject(project.id)}>
								{/* tutaj musimy dodac jeszcze project.id, zeby wiedziec który obiekt jest obecnie renderowany*/}
								{project.title}
							</button>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}
