import { createSlice } from "@reduxjs/toolkit";
import USERS_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  revokeUser: false,
  showEditUser: false,
  showAddUser: false,
  roleList: [
    {
      Id: "d96d9d2e-1353-48d5-aae6-bc721729c20f",
      Name: "CEPTG",
    },
    {
      Id: "440bbfce-5556-498c-b50d-9db000432cd5",
      Name: "MDA",
    },
    {
      Id: "56f989314092-4cd8-84e8-215acfeee17c",
      Name: "FIELD TEAM",
    },
    {
      Id: "2b969671-72dd-45ce-842-32b563661a",
      Name: "ADMIN",
    },
  ],
  userStatusList: [
    {
      Id: 0,
      Name: "Active",
    },
    {
      Id: 1,
      Name: "In-Active",
    },
  ],
  usersList: [],
  pagingData: null,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handleUsersFetched = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    usersList: {
      $set: payload.data,
    },
    pagingData: {
      $set: payload.metaData,
    },
  });
};

const handleNewUserAdded = (state, { payload }) => {
  return update(state, {
    isCreating: {
      $set: false,
    },

    usersList: {
      $push: [payload],
    },
  });
};

const handleRemovedUser = (state, { payload }) => {
  const index = state.usersList?.findIndex((i) => i.Id === payload.userId);

  return update(state, {
    isDeleting: {
      $set: false,
    },
    usersList: {
      $splice: [[index, 1]],
    },
    revokeUser: {
      $set: false,
    },
  });
};

const handleError = (state, { error }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    isDeleting: {
      $set: false,
    },
    isCreating: {
      $set: false,
    },
    error: {
      $set: error,
    },
  });
};

const setErrorAction = (state, action) => {
  return update(state, {
    error: {
      $set: action.error,
    },
  });
};
const clearError = (state) => {
  return update(state, {
    error: {
      $set: null,
    },
  });
};

const clearSuccessMessage = (state) =>
  update(state, {
    success: {
      $set: null,
    },
  });

export const usersSlice = createSlice({
  name: "userReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(USERS_CONSTANT.RevokeAccessSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(USERS_CONSTANT.EditUserSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(USERS_CONSTANT.AddUserSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });

    builder.addCase(USERS_CONSTANT.getAllUsersRequested, (state, action) => {
      return requestingHome(state, "isFetching");
    });
    builder.addCase(USERS_CONSTANT.getAllUsersError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(USERS_CONSTANT.getAllUsersSuccess, (state, action) => {
      return handleUsersFetched(state, action);
    });

    builder.addCase(USERS_CONSTANT.addNewUserRequested, (state, action) => {
      return requestingHome(state, "isFetching");
    });
    builder.addCase(USERS_CONSTANT.addNewUserError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(USERS_CONSTANT.addNewUserSuccess, (state, action) => {
      return handleNewUserAdded(state, action);
    });

    builder.addCase(USERS_CONSTANT.deleteUserRequested, (state, action) => {
      return requestingHome(state, "isDeleting");
    });
    builder.addCase(USERS_CONSTANT.deleteUserError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(USERS_CONSTANT.deleteUserSuccess, (state, action) => {
      return handleRemovedUser(state, action);
    });

    builder.addCase(USERS_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    builder.addCase(USERS_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(USERS_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });
  },
});

export default usersSlice.reducer;
