import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getWorkItems as getWorkItemsAction  } from "../modules/store";
import Header from "./header";

const WorkItems = ({ workItems, getWorkItems }) => {
    let { id } = useParams();
    useEffect(() => {
        getWorkItems(id)
    }, [])
    return(
        <div>
            <Header />
            <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>

          {
              workItems.map((item) => {
                  let time = "";
                  let hours = Math.trunc(item.duration.minutes/60);
                  let minutes = item.duration.minutes % 60;
                  time = hours + " hour " + minutes + " minutes "
                return(<tr key={item.id}>
                  <td>{item.author.name}</td>
                  <td>{time}</td>
                </tr>)
              })
           }
        </tbody>
      </table>
        </div>
    )
}
export default connect(
    ({ globalState}) => ({ workItems: globalState.workItems }), {
        getWorkItems: getWorkItemsAction,
      }
)(WorkItems)