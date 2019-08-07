export default {
  findAllTax({ dispatch }) {
    dispatch("findDiscount");
    dispatch("findcgst");
    dispatch("findsgst");
    dispatch("findigst");
    dispatch("findkfc");
    dispatch("findGrandTotal");
  },
  findDiscount({ state, commit }) {
		let tempFooter = state.footer;
    if (
      state.footer[0].discountPercentage > 100 ||
      state.footer[0].discountPercentage < 0
    ) {
      tempFooter[0].discountPercentage = 0;
    } else {
      let discount = (tempFooter[0].discountPercentage / 100) * tempFooter[0].subTotal;
      tempFooter[0].discount = discount.toFixed(2);
			tempFooter[0].newsubTotal = tempFooter[0].subTotal - tempFooter[0].discount;
    }
		commit("setState", {state: 'footer', value: tempFooter})
	},
	findcgst({state, commit}) {
		let footer = state.footer
		if(((state.cdetails[0].state_code==state.cldetails[0].state_code) && state.cdetails[0].gst_no && state.cldetails[0].gst_no)|| (state.cldetails[0].state_code==32 && !state.cldetails[0].gst_no))
      {
      let cgst = (footer[0].cgstPercentage / 100) * footer[0].newsubTotal;
			footer[0].cgst = cgst.toFixed(2);
		}
		commit("setState", {state: 'footer', value: footer})
	},
	findsgst({state, commit}) {
		let footer = state.footer
		if(((state.cdetails[0].state_code==state.cldetails[0].state_code) && state.cdetails[0].gst_no && state.cldetails[0].gst_no)|| (state.cldetails[0].state_code==32 && !state.cldetails[0].gst_no))      
      {
      let sgst = (footer[0].sgstPercentage / 100) * footer[0].newsubTotal;
      footer[0].sgst = sgst.toFixed(2);
			}
		commit("setState", {state: 'footer', value: footer})
	},
	findigst({state, commit}) {
		let footer = state.footer
		if((state.cdetails[0].state_code!=state.cldetails[0].state_code) && state.cdetails[0].gst_no && state.cldetails[0].gst_no)
		{
			let igst = (footer[0].igstPercentage / 100) * footer[0].newsubTotal;
			footer[0].igst = igst.toFixed(2);
		}
		commit("setState", {state: 'footer', value: footer})
	},
	findkfc({state, commit}) {
		let footer = state.footer
		if(state.cldetails[0].state_code==32 && !state.cldetails[0].gst_no)
		{
			let kfc = (footer[0].kfcPercentage / 100) * footer[0].newsubTotal;
			footer[0].kfc = kfc.toFixed(2);
		}
		commit("setState", {state: 'footer', value: footer})
	},
	findGrandTotal({state, commit}) {
		let footer = state.footer
		let grandTotal =
			parseFloat(footer[0].newsubTotal) +
			parseFloat(footer[0].igst) +
			parseFloat(footer[0].sgst) +
			parseFloat(footer[0].cgst) +
			parseFloat(footer[0].kfc)
		footer[0].grandTotal = grandTotal.toFixed(2);
		commit("setState", {state: 'footer', value: footer})
	},
	changeData({state, commit }, index) {
		let footer = state.footer
		if (state.items[index].qty && state.items[index].up) {
			state.items[index].tot = state.items[index].qty * state.items[index].up;
		}
		let subTotal = 0;
		state.items.map(item => {
			subTotal += item.tot;
		});
		footer[0].subTotal = subTotal.toFixed(2);
		commit("setState", {state: 'footer', value: footer})
	},
	generatePdf({state, dispatch}) {
		if (validatePDF(state))
		{
			var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
			let url =`/invoice/invoice.pdf?cdetails=${JSON.stringify(state.cdetails)}&cldetails=${JSON.stringify(state.cldetails)}&items=${JSON.stringify(state.items)}&text1=${JSON.stringify(state.text1)}&text2=${JSON.stringify(state.text2)}&footer=${JSON.stringify(state.footer)}&status=${JSON.stringify(state.status)}`
			if(is_chrome)
			{
				const link = document.createElement('a');
				link.href = url;
				link.click();
			}
			else
			{
					state.validation = false
					window.open(`/invoice/invoice.pdf?cdetails=${JSON.stringify(state.cdetails)}&cldetails=${JSON.stringify(state.cldetails)}&items=${JSON.stringify(state.items)}&text1=${JSON.stringify(state.text1)}&text2=${JSON.stringify(state.text2)}&footer=${JSON.stringify(state.footer)}&status=${JSON.stringify(this.status)}`);
			}
		}
		else
		{
				window.alert("Missing fields");
				state.validation = true
		}
	},
};
let validatePDF = state => {
	if (state.status==true)
        return ((state.items.length!=0) &&
              (state.footer[0].subTotal!=0)&&
              state.cdetails[0].state_code &&
              state.cldetails[0].state_code &&
              state.cdetails[0].gst_no&&
              state.cdetails[0].cname &&
              state.cldetails[0].name);
      else
      return ((state.items.length!=0) &&
              (state.footer[0].subTotal!=0)&&
              state.cdetails[0].cname &&
              state.cldetails[0].name);
}
