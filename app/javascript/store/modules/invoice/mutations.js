export default {
  setState: (state, object) => {
    state[object.state] = object.value;
  },
}