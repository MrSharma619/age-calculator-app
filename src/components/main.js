import "./main.css";
import { ReactComponent as CustomSvg } from './svg/icon-arrow.svg';

function Main() {
  return (
    <div className="main-div">
      <div className="d-flex">
        <div className="p-2 flex-fill day-div">
          <span className="day-span">DAY</span>
          <br></br>
          <input type="number" className="day-input" placeholder="DD" />
        </div>

        <div className="p-2 flex-fill month-div">
          <span className="month-span">MONTH</span>
          <br></br>
          <input type="number" className="month-input" placeholder="MM" />
        </div>

        <div className="p-2 flex-fill year-div">
          <span className="year-span">YEAR</span>
          <br></br>
          <input type="number" className="year-input" placeholder="YYYY" />
        </div>
      </div>

      <div className="d-flex2">
        <div className="p-2 flex-fill">
          <hr className="hr-cls" />
        </div>
        <div className="p-2 flex-fill">
            <div className="circle-purple"><CustomSvg /></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
