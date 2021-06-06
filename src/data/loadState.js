export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("Error while loading state --> ", err);
    return {};
  }
};
