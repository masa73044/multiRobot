// import axios from "axios";
import axios from "axios";

const SET_ROBOTS = "SET_ROBOTS";
const CREATE_ROBOT = "CREATE_ROBOT";
const DELETE_ROBOT = "DELETE_ROBOT";
const UPDATE_ROBOT = "UPDATE_ROBOT";

export const setRobots = (robots) => ({
  type: SET_ROBOTS,
  robots,
});

export const createRobot = (robot) => ({
  type: CREATE_ROBOT,
  robot,
});

export const deleteRobot = (robot) => ({
  type: DELETE_ROBOT,
  robot,
});

export const updateRobot = (robot) => ({
  type: UPDATE_ROBOT,
  robot,
});

export const fetchRobots = () => {
  return async (dispatch) => {
    try {
      const { data: robots } = await axios.get("/api/robots");
      dispatch(setRobots(robots));
    } catch (error) {
      console.log(error);
    }
  };
};

export const intCreateRobot = (robot, history) => {
  return async (dispatch) => {
    try {
      const { data: newRobot } = await axios.post("/api/robots", robot);
      dispatch(createRobot(newRobot));
      history.push("/robots");
    } catch (error) {
      console.log(error);
    }
  };
};

export const intDeleteRobot = (robotId) => {
  return async (dispatch) => {
    try {
      const { data: robot } = await axios.delete(`/api/robots/${robotId}`);
      dispatch(deleteRobot(robot));
    } catch (error) {
      console.log(error);
    }
  };
};

export const intUpdateRobot = (robot) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(`/api/robots/${robot.id}`, robot);
    dispatch(updateRobot(updated));
  };
};

const initalState = {
  all: [],
};
export default function robotsReducer(state = initalState, action) {
  switch (action.type) {
    case SET_ROBOTS:
      return { all: action.robots };
    case CREATE_ROBOT:
      return { all: [...state.all, action.robot] }; //takes old, adds payload
    case DELETE_ROBOT:
      return { all: state.all.filter((robot) => robot.id !== action.robot.id) };
    case UPDATE_ROBOT:
      return { all: [...state.all, action.robot] };
    default:
      return state;
  }
}

// export default robotsReducer;
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers

// export default function rootReducer() {
//   return null;
// }
