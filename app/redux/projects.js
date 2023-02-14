import axios from "axios";

const SET_PROJECTS = "SET_PROJECTS";

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  projects,
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
const initalState = {
  all: [],
};
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function projectsReducer(state = initalState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return { all: action.projects };

    default:
      return state;
  }
}
