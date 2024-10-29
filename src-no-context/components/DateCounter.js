/* WHAT IS USEREDUCER HOOK ?
    UseReducer hook is more advanced and complex way of managing state instead of the useState hook. useReducer() hook works with a 
    so called reducer function which is a pure function that will always  take the previous state and action as an argument and then it
    will return the next state

    The biggest advantage of useReducer() hook is all the state updates are happening  in one central place at the below reducer() function
*/

import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  // This reducer function will take current state and action as arguments and returns the next state
  console.log(state, action);
  // return state + action; // Whatever we return from here will become the next state (or) new state
  /* In our case we have 3 actions where we have decreasing the count , increasing the count and setting the count. So we have to
     name these actions
  */

  // return { count: 0, step: 1 };

  switch (action.type) {
    case "dec":
      return {
        ...state,
        count: state.count - state.step,
      }; // We are creating a new brand object which contains the information of all the previous object (...state) and in this brand new
    // object we are overriding the count

    case "inc":
      return {
        ...state,
        count: state.count + state.step,
      }; // We are creating a new brand object which contains the information of all the previous object (...state) and in this brand new
    // object we are overriding the count

    case "setCount":
      return {
        ...state,
        count: action.payload,
      }; // We are creating a new brand object which contains the information of all the previous object (...state) and in this brand new
    // object we are overriding the count

    case "setStep":
      return {
        ...state,
        step: action.payload,
      };

    case "reset":
      return action.payload; // (or) return { count: 0, step: 1 };

    default:
      throw new Error("Unknown action type");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState); // This useReducer() hook will take initial state and reducer function as arguments.
  // In the above initial state is taken as zero. This useReducer() hook will return the current state just like the useState() hook
  // But then instead of returning a state updating function this useReducer() hook will return a dispatch function and this dispatch
  // function is also used to update the state

  const { count, step } = state; // We are destructuring the state object into count and step

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: -1 }); // Here we are sending an action object to the reducer function
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc", payload: 1 }); // Here we are sending an action object to the reducer function
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset", payload: initialState });
    // // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
