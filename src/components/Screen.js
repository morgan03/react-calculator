import { useState, useReducer, useEffect } from "react";
import Error from "./Error";
import { reducer } from "../reducer";

const initialState = {
  prevValue: "",
  nextValue: "",
  isError: false,
  errorMessage: "",
  isTotal: false,
  totalValue: "",
  isClear: false,
  sign: ""
};

const Screen = () => {
  const [value, setValue] = useState("0");
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.prevValue) {
      // get the state for the second value
      dispatch({ type: "CALCULATE_VALUE", payload: value });
    } else {
      dispatch({ type: "NO_VALUE" });
    }
    // need to update state with the total value
  };

  const updateGrid = (e) => {
    if (value === "0") {
      setValue(e.target.value);
    } else {
      setValue(value + e.target.value);
    }
  };

  const deleteDigit = () => {
    if (value.length !== 1) {
      setValue(value.slice(0, value.length - 1));
    } else {
      setValue("0");
    }
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
    setValue("0");
  };

  const closeError = () => dispatch({ type: "CLOSE_ERROR" });

  useEffect(() => {
    // after the value has been set the first time
    // need to reset is total
    if (state.isTotal) {
      setValue(state.totalValue);
      return state.totalValue;
    } else {
      return value;
    }
  }, [state.isTotal, value]);

  const setOperation = (e) => {
    // need to add functionality to allow for neg numbers
    if (e.target.value === "-" && value === "0") {
      setValue("-");
    } else {
      dispatch({
        type: "SET_OPERATION",
        payload: { value: value, sign: e.target.value }
      });
      setValue("0");
    }
  };

  return (
    // put a component here for when there is an error
    <>
      {state.isError && (
        <Error closeError={closeError} errorMessage={state.errorMessage} />
      )}
      <div className="calc-grid">
        <div className="screenDiv">
          <div>
            {state.prevValue}
            {state.sign}
            {state.nextValue}
          </div>
          <div>{value}</div>
        </div>

        <div className="buttonDiv">
          <div className="three-row">
            <button onClick={clearAll}>AC</button>
            <button onClick={deleteDigit}>Del</button>
            <button onClick={(e) => setOperation(e)} value="/">
              /
            </button>
          </div>

          <div className="four-row">
            <button onClick={(e) => updateGrid(e)} value="1">
              1
            </button>
            <button onClick={(e) => updateGrid(e)} value="2">
              2
            </button>
            <button onClick={(e) => updateGrid(e)} value="3">
              3
            </button>
            <button onClick={(e) => setOperation(e)} value="*">
              *
            </button>
          </div>

          <div className="four-row">
            <button onClick={(e) => updateGrid(e)} value="4">
              4
            </button>
            <button onClick={(e) => updateGrid(e)} value="5">
              5
            </button>
            <button onClick={(e) => updateGrid(e)} value="6">
              6
            </button>
            <button onClick={(e) => setOperation(e)} value="+">
              +
            </button>
          </div>

          <div className="four-row">
            <button onClick={(e) => updateGrid(e)} value="7">
              7
            </button>
            <button onClick={(e) => updateGrid(e)} value="8">
              8
            </button>
            <button onClick={(e) => updateGrid(e)} value="9">
              9
            </button>
            <button onClick={(e) => setOperation(e)} value="-">
              -
            </button>
          </div>

          <div className="three-row">
            <button onClick={(e) => updateGrid(e)} value=".">
              .
            </button>
            <button onClick={(e) => updateGrid(e)} value="0">
              0
            </button>
            <form onSubmit={(e) => onSubmit(e)}>
              <button type="submit" onSubmit={(e) => onSubmit(e)}>
                =
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Screen;
