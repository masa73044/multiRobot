// import axios from "axios";
import axios from "axios";

const SET_ROBOTS = "SET_ROBOTS";
const CREATE_ROBOT = "CREATE_ROBOT";

export const setRobots = (robots) => ({
  type: SET_ROBOTS,
  robots,
});

export const createRobot = (robot) => ({
  type: CREATE_ROBOT,
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

const initalState = {
  all: [],
};
export default function robotsReducer(state = initalState, action) {
  switch (action.type) {
    case SET_ROBOTS:
      return { all: action.robots };
    case CREATE_ROBOT:
      return { all: [...state.all, action.robot] }; //takes old, adds payload

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
