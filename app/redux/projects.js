import axios from "axios";

const SET_PROJECTS = "SET_PROJECTS";
const CREATE_PROJECT = "CREATE_PROJECT";
const DELETE_PROEJCT = "DELETE_PROEJCT";

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  projects,
});

export const createProject = (project) => ({
  type: CREATE_PROJECT,
  project,
});

export const deleteProject = (project) => ({
  type: DELETE_PROEJCT,
  project,
});

export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data: projects } = await axios.get("/api/projects");
      dispatch(setProjects(projects));
    } catch (error) {
      console.log(error);
    }
  };
};

export const intCreateProject = (project, history) => {
  return async (dispatch) => {
    try {
      const { data: newProject } = await axios.post("/api/projects", project);
      dispatch(createProject(newProject));
      history.push("/projects");
    } catch (error) {
      console.log(error);
    }
  };
};

export const intDeleteProject = (projectId) => {
  return async (dispatch) => {
    try {
      const { data: project } = await axios.delete(
        `/api/projects/${projectId}`
      );
      dispatch(deleteProject(project));
    } catch (error) {
      console.log(error);
    }
  };
};

const initalState = {
  all: [],
};

export default function projectsReducer(state = initalState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return { all: action.projects };

    case CREATE_PROJECT:
      return { all: [...state.all, action.project] };
    case DELETE_PROEJCT:
      return {
        all: state.all.filter((project) => project.id !== action.project.id),
      };
    default:
      return state;
  }
}
