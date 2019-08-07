export default {
  setState: (state, object) => {
    state[object.state] = object.value;
	},
	addItemToTable: (state) => {
		let row = { sn:'-', item: "", qty: 0, up: 0, tot: 0 };
		state.items.push(row)
	},
	removeLastItem(state) {
		state.items.pop()
	}
}