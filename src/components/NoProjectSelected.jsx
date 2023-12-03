import Button from './Button.jsx';
import noProjectImage from '../assets/no-projects.png';
export default function NoProjectSelected({ onStartAddProject }) {
	return (
		<div className='mt-24 text-center w-2/3'>
			<img
				src={noProjectImage}
				alt='An empty task list'
				className='w-16 h16 object-contain mx-auto'
			/>
			<h2 className='text-xl font-bold text-stone-500 my-4'>
				Nie wybrano żadnego projektu
			</h2>
			<p className='text-stone-400 mb-4'>
				Wybierz projekt z listy albo stwórz nowy
			</p>
			<p className='mt-8'>
				<Button onClick={onStartAddProject}>Stwórz nowy projekt</Button>
			</p>
		</div>
	);
}
