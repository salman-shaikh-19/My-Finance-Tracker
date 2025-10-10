
// export const refreshData = ({ loggedInUserId, dispatch, action, customDate, setOffset }) => {
//   if (!loggedInUserId) return;

//   dispatch(action({ userId: loggedInUserId, customWeakDate: customDate }));

//   if (setOffset) setOffset(0);
// };
export const refreshData = ({ loggedInUserId, dispatch, action, params = {}, resetOffset }) => {
  if (!loggedInUserId) return;


  dispatch(action({ userId: loggedInUserId, ...params }));

  
  if (typeof resetOffset === "function") {
    resetOffset(0);
  }
};