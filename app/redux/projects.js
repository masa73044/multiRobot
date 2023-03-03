import axios from "axios";

const SET_PROJECTS = "SET_PROJECTS";
const CREATE_PROJECT = "CREATE_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const UPDATE_PROJECT = "UPDATE_PROJECT";
const REMOVE_PROJECT = "REMOVE_PROJECT";

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  projects,
});

export const createProject = (project) => ({
  type: CREATE_PROJECT,
  project,
});

export const deleteProject = (project) => ({
  type: DELETE_PROJECT,
  project,
});

export const updateProject = (project) => ({
  type: UPDATE_PROJECT,
  project,
});

export const removeProject = (project) => ({
  type: REMOVE_PROJECT,
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

export const intUpdateProject = (project) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/projects/${project.id}`,
      project
    );
    dispatch(removeProject(updated));
  };
};

export const intRemoveProject = (project, robotId) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/projects/${project.id}/`,
      robotId
    );
    dispatch(updateProject(updated));
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
    case DELETE_PROJECT:
      return {
        all: state.all.filter((project) => project.id !== action.project.id),
      };
    case UPDATE_PROJECT:
      return { all: [...state.all, action.project] };
    default:
      return state;
  }
}
