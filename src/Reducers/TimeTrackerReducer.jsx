import {
  AUTHORIZATION,
  LOGOUT,
  LOAD_USER_LIST,
  LOAD_USER_ID,
  LOAD_CURRENT_USER,
  LOAD_PROJECT_LIST,
  LOAD_PROJECT_ID,
  CREATE_PROJECT,
  LOAD_TASK,
  CREATE_TASK,
  DELETE_TASK,
  DELETE_PROJECT,
  ADD_COMMENT_TASK,
  EDIT_TASK,
  ADD_TIME_LOG,
  DELETE_PROJECT_PERFORMER,
} from "./Types";

import Cookies from "js-cookie";
import produce from "immer";
const initialState = {
  Authorization: {
    auth_token: Cookies.get("auth_token"),
    username: "",
    user_id: "",
  },
  isAuthenticated: Cookies.get("isAuthenticated") ? true : false,
  UserList: [],
  UserId: {},
  CurrentUser: {},
  ProjectList: [],
  ProjectDetail: {
    tasks: [],
    performers: [],
  },
  CurrentTask: {},
};

const TimeTrackerReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AUTHORIZATION:
        draft.Authorization.auth_token = action.payload;
        return;

      case LOAD_CURRENT_USER:
        draft.CurrentUser = action.payload;
        draft.isAuthenticated = true;
        return;

      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          CurrentUser: {},
          Authorization: {},
          ProjectList: [],
          ProjectDetail: {},
          CurrentTask: {},
        };

      case LOAD_USER_LIST:
        draft.UserList = action.payload;
        return;

      case CREATE_PROJECT:
        draft.ProjectList.push(action.payload);
        return;

      case DELETE_PROJECT:
        return {
          ...state,
          ProjectList: state.ProjectList.filter(
            (item) => item.name !== action.payload
          ),
        };

      case LOAD_PROJECT_LIST:
        return {
          ...state,
          ProjectList: action.payload,
        };

      case DELETE_PROJECT_PERFORMER:
        return {
          ...state,
          ProjectDetail: {
            ...state.ProjectDetail,
            performers: state.ProjectDetail.performers.filter(
              (item) => item.id !== action.payload
            ),
          },
        };

      case LOAD_USER_ID:
        return {
          ...state,
          UserId: action.payload,
        };
      case LOAD_PROJECT_ID:
        return {
          ...state,
          ProjectDetail: action.payload,
        };

      case LOAD_TASK:
        return {
          ...state,
          CurrentTask: action.payload,
        };

      case CREATE_TASK:
        return {
          ...state,
          ProjectDetail: {
            ...state.ProjectDetail,
            tasks: [...state.ProjectDetail.tasks, action.payload],
          },
        };
      case DELETE_TASK:
        return {
          ...state,
          ProjectDetail: {
            ...state.ProjectDetail,
            tasks: state.ProjectDetail.tasks.filter(
              (item) => item.theme !== action.payload
            ),
          },
        };

      case EDIT_TASK:
        let newObj = state.ProjectDetail;
        let newTask = newObj.tasks;
        let index = newTask.findIndex((el) => el.id === action.payload.id);
        draft.ProjectDetail.tasks[index] = action.payload;
        return;

      case ADD_COMMENT_TASK:
        return {
          ...state,
          CurrentTask: {
            ...state.CurrentTask,
            comments: state.CurrentTask.comments.concat(action.payload),
          },
        };
      case ADD_TIME_LOG:
        return {
          ...state,
          CurrentTask: {
            ...state.CurrentTask,
            timelog: state.CurrentTask.timelog.concat(action.payload),
          },
        };
      default:
        return state;
    }
  });
};
export default TimeTrackerReducer;
