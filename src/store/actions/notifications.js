export const addNotification = (message, type = "default") => {
  const key = Date.now();
  return {
    type: "ADD_NOTIFICATION",
    payload: {
      message,
      options: {
        key,
        variant: type,
        autoHideDuration: 2000,
      },
      key,
    },
  };
};

export const removeNotification = (key) => ({
  type: "REMOVE_NOTIFICATION",
  payload: key,
});
