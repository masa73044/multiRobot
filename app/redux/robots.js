// import axios from "axios";
import axios from "axios";

const SET_ROBOTS = "SET_ROBOTS";

export const setRobots = (robots) => ({
  type: SET_ROBOTS,
  robots,
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

const initalState = {
  all: [],
};
export default function robotsReducer(state = initalState, action) {
  switch (action.type) {
    case SET_ROBOTS:
      return { all: action.robots };

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
