import "bootstrap/dist/css/bootstrap.min.css";
import Increment from "./Increment";
import Decrement from "./Decrement";
function ChangeCounter(props) {
  return (
    <div>
      <Decrement />

      <Increment />
    </div>
  );
}

export default ChangeCounter;
