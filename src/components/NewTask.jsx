import { useState } from 'react';
import { useRef } from 'react';
import Modal from './Modal.jsx';

export default function NewTask({ onAdd }) {
	const modal = useRef();
	const [enteredTask, setEnteredTask] = useState('');

	function handleChange(event) {
		setEnteredTask(event.target.value);
	}

	function handleClick() {
		if (enteredTask.trim() === '') {
			//pokaż error który będzie w nowym komponencie modal.jsx
			modal.current.open();
			return;
		}
		onAdd(enteredTask);
		setEnteredTask('');
	}
	return (
		<>
			<Modal ref={modal} buttonCaption='Zamknij'>
				<h2 className='text-xl font-bold text-stone-700 my-4'>Błąd</h2>
				<p className='text-stone-600 mb-4'>
					Brak wprowadzonego zadania
				</p>
			</Modal>
			<div className='flex items-center gap-4'>
				<input
					type='text'
					value={enteredTask} // dwukierunkowe wiązanie, ustawia wartość domyślną jako enteredTask
					className='w-64 px-1 py-1 rounded-sm bg-stone-200 mr-5'
					onChange={handleChange}
				/>
				<button
					onClick={handleClick}
					className='text-stone-700 hover:text-stone-950'>
					Dodaj zadanie
				</button>
			</div>
		</>
	);
}

//jak zebrac i przekazac dane z inputa
//najpierw musimy wyodrebnic dane i pzrekazac do buttona po kliknięciu
//możnaby zrobic za pomoca udeRef(), ale chcemy teraz tez wyczyscic to wejscie i ustawic je spowrotem na puste po kliknieciu AddTask, można to zrobic za pomocą ref ale byłoby to niezgodne z ideą Racta jako odpowiedzialnedo za DOM i aktualizacje
//użyjemy STANU:
// najpierw zaimportować import { useState } from 'react';
//przed return ustawić stan, enteredTask  const [enteredTas, setEnteredTask] = useState();
//dodac funkcję która będzie obsługiwać zmiany function handleChange() i połączyć ją z inputem onChange={handleChange}
// w funkcji przekazujemy event czyli cel zdarzenia, któe z kolei będzie zawierało wprowadzoną do niego wartość setEnteredTask(event.target.value);
// dalej musimy się  upewnic ze po wcisnieciu buttona przeslemy wszystkie wprowadzone dane do miejsca gdzie bedziemy je zapisywac
// tym miejscem powinien być komponent App ponieważ tam przechowujemy wszystkie nasze PROJEKTY
// projekty to będzie miejsce gdzie chcemy wysłać zadania, czyli rzeczy które są związane z poszczególnymi projektami
// bedziemy musieli je również przekazać przez wiele warstw komponentów
// w głównej funkcji App dodajemy nowy stan, tasks[]
// dlatego bedziemy tam potrzebowac oddzielnych funkcji np. do dodawania zadania handleAddTask
//i drugą do usuwania zadania handleDeleteTask

//zanim obsłuzymy te funkcje w App, tutaj trzeba dodac obsługę klikania function handleClick() i połączyć nową nunkcję z buttonem za pomocą onCLick
// w obsłudze buttona function handleClick() zrobimy 2 rzeczy:
//1. przekazać nową warość
//2. zresestować po kliknięciu
//trzeba przenieść nowo wprowadzone zadanie(tsk) enteredTask do App
// czyli w App mamy funkcje function handleAddTask() {} i trzeba ją przekazać do NewTask
//teraz NewTask znajduje się we wnętrzeu komponentu Task:
//<section>
//<h2 className='text-2sl font-bold text-stone-700 mb-4'>Tasks</h2>
//<NewTask />
//<p className='text-stone-800 my-4'> nie ma tu żadnych zadań</p>
//<ul></ul>
//</section>

//więc NewTask będize musiał przejść przez kompontnt Tasks
//komponent Tasks znajduje się wewnątrz wybranego projektu, więc będzie trzeba też przejść przez ten komponent SelectedProject
//to nosi nazwę PROP DRILLING
// żeby to wszystko poprzekazywać przekażemy poprostu nasze rekwizyty (propsy) przez wszystkie warstwy komponentów

//1. W App przekazać handleAddTask do komponentu SelectedProject onAddTask ={handleAddTask}  i tak samo onDeleteTask = {handleDeleteTask}
//2. Następnie wchodzimy do komponentu SelectedProject i odbieramy te propsy export default function SelectedProject({ project, onDeleteProject, onAddTask, onDeleteTask })
//3. ale one tędy tylko przechodzą, potrzebujemy ich w komponencie Task który tutaj jest używany, dlatego przekazujemy je dalej <Tasks onAdd={onAddTask} onDelete={onDeleteTask} />
//4. teraz przechodzimy do komponentu Tasks i tam ich użyjemy export default function Tasks({ onAdd, onDelete }) {
//5. onDelete użyjemy potem do usuwania
//6. onAdd przekazujemy w miejsce NewTask <NewTask onAdd={onAdd} />
//7. tu zakończyło się wiercenie rekwizytów drilling props i w komponencie NewTasks wydrębniamy je destrukturyzacją export default function NewTask({ onAdd }) {
//8. finalnie w handleClick wywołam onAdd i przekażę wartość onAdd(enteredTask); czyli wartość wprowadzoną przez użytkownika

//teraz w komponencie App jako propsa można przekazać text
// dodajemy obsługę bazując na funkcji dodawania projektu
/*function handleAddTask(text) {
    setProjectsState((prevState) => {
        const taskId = Math.random();
        const newTask = {
            text: text, //przekazana własciwosc tekstowa
            id: taskId,
            projectId: prevState.selectedProjectId, // ponieważ zeby wybrac wprowadzac taska musimy już miec wybrany projekt
        };
        return {
            ...prevState,
            tasks: [...prevState.tasks, newTask],
        };
    });
}*/

//. teraz upewnic się ze zadania są wysyłane w komponencie Tasks do miejsca <ul></ul>
//dlatego w komponencie Tasks trzeba dodac nowy props tasks export default function Tasks({ tasks, onAdd, onDelete }) musimy pobrac te zadania które należą do tego projektu w którym ten komponent jest renderowany (czyli Tasks???)
//dlatego musimy uzyskać tablicę zadań i możemy jej użyc do warunkowego wprowadzania akapitu o braku zadań lub wyświetlaniu tych zadań na listę ul
// tasks są zwracane w App w funkcji
// function handleAddTask(text) {
//     setProjectsState((prevState) => {
//         const taskId = Math.random();
//         const newTask = {
//             text: text, //przekazana własciwosc tekstowa
//             id: taskId,
//             projectId: prevState.selectedProjectId, // ponieważ zeby wybrac wprowadzac taska musimy już miec wybrany projekt
//         };
//         return {
//             ...prevState,
//             tasks: [...prevState.tasks, newTask],
//         };
//     });
// }
//ALE MUSIMY JE JESZCZE PRZEKAZAĆ DO PROJECTSIDEBAR
// //<ProjectsSidebar
// onStartAddProject={handleStartAddProject}
// projects={projectsState.projects}
// onSelectProject={handleSelectedProject}
// tasks={projectsState.tasks}
// />
//potem tez do wybranych projektów SELECTEDPROJECT export default function SelectedProject({ project, onDeleteProject, onAddTask, onDeleteTask, tasks }) {
// I NA DOLE do komponentu tasks który tu używamy
