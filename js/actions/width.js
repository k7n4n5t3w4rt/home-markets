// @flow
export default () /*: number */ => {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  } else {
    return 200;
  }
};
