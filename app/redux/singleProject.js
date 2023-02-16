// import axios from "axios";
import axios from "axios";

const SET_SINGLE_PROJECT = "SET_SINGLE_PROJECT";

export const setSingleProject = (project) => ({
  type: SET_SINGLE_PROJECT,
  project,
});

export const fetchSingleProject = (projectId) => {
  return async (dispatch) => {
    try {
      const { data: singleProject } = await axios.get(
        `/api/projects/${projectId}`
      );
      dispatch(setSingleProject(singleProject));
    } catch (error) {
      console.log(error);
    }
  };
};
const initalState = {
  selectedProject: {},
};

export default function singleProjectReducer(state = initalState, action) {
  switch (action.type) {
    case SET_SINGLE_PROJECT:
      return { selectedProject: action.project };

    default:
      return state;
  }
}
