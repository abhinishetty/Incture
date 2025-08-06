export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"; 
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      dispatch({ type: FETCH_USER_SUCCESS, payload: data });  
    } catch (error) {
      dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
    }
  };
};
