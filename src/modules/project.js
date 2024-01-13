export default class Projects {
    constructor(storage, ...projects) {
        if (projects.length === 0) {
            throw new Error(
                "At least one project is required as argument to build a functional object"
            );
        }
        this.projects = projects;
        this.actualProject = this.projects[0];
        this.deletable = this.projects.length > 1;
        this.storage = storage;
    }

    display() {
        console.log(this.projects);
    }

    getActualProject() {
        return this.actualProject;
    }

    getProjects() {
        return this.projects;
    }

    setProject(project) {
        if (!this.projects.includes(project)) {
            return new Error(`${project} project does not exist`);
        } else {
            this.actualProject = project;
        }
    }

    addProject(newProject) {
        if (!projectExists(newProject)) {
            this.projects.push(newProject);
        } else {
            alert(`${newProject} already exists`);
        }
    }

    projectExists(projectToTest) {
        return this.projects.some((project) => project === projectToTest);
    }

    deleteProject(projectToRemove) {
        const projectIndex = this.projects.indexOf(projectToRemove);

        if (projectIndex === -1) {
            return new Error("The specified project does not exist");
        }

        if (this.deletable) {
            this.projects.splice(projectIndex, 1);
            if (this.actualProject === projectToRemove) {
                this.actualProject =
                    this.projects.length > 0
                        ? this.projects[projectIndex - 1]
                        : null;
            }
            this.deletable = this.projects.length > 1;
        } else {
            return new Error("Cannot have less than one project");
        }

        this.storage.deleteProjectTodos(projectToRemove);
    }
}
