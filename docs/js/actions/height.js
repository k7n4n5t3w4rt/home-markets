// @flow
export default () /*: number */ => {
  if (typeof window !== "undefined") {
    return window.innerHeight;
  } else {
    return 200;
  }
};
