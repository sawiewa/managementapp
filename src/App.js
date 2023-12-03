import { useState } from 'react';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from './components/ProjectsSidebar.jsx';
import SelectedProject from './components/SelectedProject.jsx';

function App() {
	const odwroc = () => {
		const stringMy = 'abcdefghij';
		const string2 = stringMy.split('');
		const lengthArray = string2.length;
		const newTab2 = [];
		for (let i = lengthArray - 1; i >= 0; i--) {
			newTab2.push(string2[i]);
		}
		console.log(`tablica przed odwróceniem ${string2}`);
		console.log(`tablica po odwróceniu ${newTab2}`);
	};
	odwroc();
	const odwrocForEach = () => {
		const myString = 'Lorem Ipsum';
		//const stringTab = myString.split('');
		const stringTab = [...myString];
		let newTab2 = [];
		stringTab.forEach((element) => {
			newTab2.unshift(element);
		});
		newTab2 = newTab2.join('');

		console.log(`tablica przed odwróceniem FOREACH ${myString}`);
		console.log(`tablica po odwróceniu FOREACH unshift  ${newTab2}`);
	};
	odwrocForEach();

	const palindromy = () => {
		const word1 = 'ewa';
		const word2 = 'matematyka';
		const word3 = 'kajak';
		const tab = [word1, word2, word3, 'ala', 'mama'];

		tab.forEach((el) => {
			if (el === el.split('').reverse().join('')) {
				console.log(`to JEST palindrom słowo : ${el}`);
			} else {
				console.log(`to NIE jest palindrom słowo : ${el}`);
			}
		});
	};
	palindromy();

	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
	});
	function handleAddTask(text) {
		setProjectsState((prevState) => {
			const taskId = Math.random();
			const newTask = {
				text: text, //przekazana własciwosc tekstowa
				id: taskId,
				projectId: prevState.selectedProjectId, // ponieważ zeby wybrac wprowadzac taska musimy już miec wybrany projekt
			};
			return {
				...prevState,
				tasks: [newTask, ...prevState.tasks],
			};
		});
	}

	function handleDeleteTask(id) {
		setProjectsState((prevState) => {
			return {
				...prevState,
				tasks: prevState.tasks.filter((task) => task.id !== id),
			};
		});
	}

	function handleStartAddProject() {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: null,
			};
		});
	}
	function handleAddProject(projectData) {
		setProjectsState((prevState) => {
			const projectId = Math.random();
			const newProject = {
				...projectData,
				id: projectId,
			};
			return {
				...prevState,
				selectedProjectId: undefined, // to obsłuży zamknięcie widoku po kliknieciu save
				projects: [...prevState.projects, newProject],
			};
		});
	}
	function handleCancelAddProject() {
		// obsługa zamykania formularza dodawania projektu, czyli przycisku cancel
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: undefined, // zmieniamy stan na undefined ponieważ taki stan nam gwarantuje że Nowy projekt jest nie widoczny
			};
		});
	}
	//obsługa przycisku delete w komponencie SelectedProject, musimy przekazać id projektu
	//kopiojemy setProjectsState, czyli to samo co w przypadku startowania projektu ale zamiast null ustawiamy id projektu bo to będzie identyfikowało nasz projekt
	//nastepnie handleSelectedProject powinno być przekazane do komponentu paska bocznego  czyli komponentu ProjectsSitebar, u nas jako onSelectProject={handleSelectedProject}
	//atrybut onSelectProject kopiujemy i dodajemy w komponencie ProjectSitebar w nawiasach jako props
	function handleSelectedProject(id) {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: id,
			};
		});
	}
	//zeby usunąc projekt musimy zmienic stan wybranego na undefined
	function handleDeleteProject() {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: prevState.projects.filter(
					(project) => project.id !== prevState.selectedProjectId
					// używamy poprzedniego stanu id
					//dlatego nie musimy używac id tylko korzystamy z poprzedniego stanu
					//filter wybiera to co zwróci wartość false
				),
			};
		});
	}
	//console.log(projectsState);
	//do contentu ustawimy domyślny projekt, musimy go zlokalizować po id, mamy go w naszym stanie
	const selectedProject = projectsState.projects.find(
		(project) => project.id === projectsState.selectedProjectId
	); //jako argument jest instrukcja która szuka po całej tablicy i jak znajdzie to zwróci true
	let content = (
		<SelectedProject
			project={selectedProject}
			onDeleteProject={handleDeleteProject}
			onAddTask={handleAddTask} // obsługa dodawania taska
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	);
	if (projectsState.selectedProjectId === null) {
		content = (
			<NewProject
				onAdd={handleAddProject}
				onCancelAddProject={handleCancelAddProject} // dodajemy nowego propsa którego potem przekazemy do obsługi nowego projektu czyli onCancelAddProject, w NewProjekt po przecinku dodajemy takiego propsa i jako onClick={onCancelAddProject}
			/>
		);
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
	}
	// else {
	// 	content = (
	// 		<SelectedProject
	// 			project={selectedProject}
	// 			onDeleteProject={handleDeleteProject}
	// 		/>
	// 	);
	// }
	return (
		<main className='h-screen my- flex gap-8'>
			<ProjectsSidebar
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
				onSelectProject={handleSelectedProject}
				// tasks={projectsState.tasks}
				selectedProjectId={projectsState.selectedProjectId} //musi byc dodane zeby działało podświetlenie wybranego projektu
			/>
			{content}
		</main>
	);
}

export default App;
