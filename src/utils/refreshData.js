
export const refreshData = ({ loggedInUserId, dispatch, action, customDate, setOffset }) => {
  if (!loggedInUserId) return;

  dispatch(action({ userId: loggedInUserId, customWeakDate: customDate }));

  if (setOffset) setOffset(0);
};
