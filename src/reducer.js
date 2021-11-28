export const reducer = (state, action) => {
  // if one sign is true all  others must be false ;
  switch (action.type) {
    case "SET_OPERATION": {
      const { value, sign } = action.payload;
      console.log(value, sign);
      return {
        ...state,
        nextValue: "",
        isTotal: false,
        prevValue: value,
        sign: sign
      };
    }
    case "CALCULATE_VALUE": {
      const newNextValue = action.payload;
      const newTotal = eval(state.prevValue + state.sign + newNextValue);
      return {
        ...state,
        isTotal: true,
        totalValue: newTotal.toString(),
        nextValue: newNextValue
      };
    }
    case "CLEAR_ALL": {
      return {
        prevValue: "",
        nextValue: "",
        isError: false,
        isTotal: false,
        totalValue: "",
        isClear: false,
        sign: ""
      };
    }
    case "NO_VALUE": {
      return { ...state, isError: true, errorMessage: "Please enter a value" };
    }
    case "CLOSE_ERROR": {
      return { ...state, isError: false };
    }

    default:
      return;
  }
};
