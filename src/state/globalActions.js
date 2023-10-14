export const handleError = (data, dispatch) => {
  try {
    switch (data._result) {
      case "0":
        switch (data._errorCode) {
          default:
            return;
        }
      case "1":
      default:
        return;
    }
  } catch (error) {}

  return;
};
