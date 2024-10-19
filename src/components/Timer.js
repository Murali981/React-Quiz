import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  // We are starting the "Timer" in this component because this "Timer" component will mount as soon as the quiz starts
  // Below we are creating a useEffect because we want to create a side effect on mount of this Timer component.

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      // We will create a timer in javascript using setInterval and this setInterval() function will run every couple of milliseconds
      // that we defined this setInterval() function
      const id = setInterval(function () {
        // Every single setInterval() timer will return a unique ID and based on this unique ID we can clear the timer
        dispatch({ type: "tick" });
      }, 1000);

      // Below is a cleanup function which is very important as the timer has to stop eventually and if we didn't write this
      // cleanup function then the timer would continue to run in the background forever
      return () => {
        clearInterval(id); // We are clearing the time interval that we have started with setInterval(). This cleanUp function will
        // run between renders and even more importantly after this component is unmounted and then the timer will actually stop. So
        // what we had before was that each time when we restarted our quiz a new timer is getting added and so then we had many timers
        // running at the same time which will dispatch this action "dispatch({ type: "tick" });" and this is the reason our
        // timer is really going very fastly down
      };
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"} {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
