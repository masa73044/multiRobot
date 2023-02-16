// import axios from "axios";
import axios from "axios";

const SET_SINGLE_ROBOT = "SET_SINGLE_ROBOT";

export const setSingleRobot = (robot) => ({
  type: SET_SINGLE_ROBOT,
  robot,
});

export const fetchSingleRobot = (robotId) => {
  return async (dispatch) => {
    try {
      const { data: singleRobot } = await axios.get(`/api/robots/${robotId}`);
      console.log(`Hit`, singleRobot);
      dispatch(setSingleRobot(singleRobot));
    } catch (error) {
      console.log(error);
    }
  };
};
const initalState = {
  selectedRobot: {},
};

export default function singleRobotReducer(state = initalState, action) {
  switch (action.type) {
    case SET_SINGLE_ROBOT:
      return { selectedRobot: action.robot };

    default:
      return state;
  }
}
