import Input from './Input.jsx';
import { useRef } from 'react';
import Modal from './Modal.jsx';

export default function NewProject({ onAdd, onCancelAddProject }) {
	const modal = useRef();
	const title = useRef();
	const description = useRef();
	const dueDate = useRef();

	function handleSave() {
		const enteredTitle = title.current.value;
		const enteredDescription = description.current.value;
		const enteredDueDate = dueDate.current.value;
		console.log('zapisz');
		//validacja

		if (
			enteredTitle.trim() === '' ||
			enteredDescription.trim() === '' ||
			enteredDueDate.trim() === ''
		) {
			//pokaż error który będzie w nowym komponencie modal.jsx
			modal.current.open();
			return;
		}

		onAdd({
			title: enteredTitle,
			description: enteredDescription,
			dueDate: enteredDueDate,
		});
	}
	return (
		<>
			<Modal ref={modal} buttonCaption='close'>
				<h2 className='text-xl font-bold text-stone-700 my-4'>Błąd</h2>
				<p className='text-stone-600 mb-4'>
					Nieprawidłowe lub puste dane wejściowe
				</p>
			</Modal>

			<div className='w-[35rem] mt-16 '>
				<menu className='flex items-center justify-end gap-4 my-4'>
					<li>
						<button
							onClick={onCancelAddProject}
							className='text-stone-800 hover:text-stone-950'>
							Zakończ
						</button>
					</li>
					<li>
						<button
							className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:ng-stone-950'
							onClick={handleSave}>
							Zapisz
						</button>
					</li>
				</menu>
				<div>
					<Input type='text' ref={title} label='Tytuł' />
					<Input ref={description} label='Opis' textarea={true} />
					<Input type='date' ref={dueDate} label='Data' />
				</div>
			</div>
		</>
	);
}
