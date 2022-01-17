import axios from "axios";
import { useEffect, useState } from "react";
import { getIssues as getIssuesAction } from "../modules/store";
import { getFiltredIssues as getFiltredIssuesAction } from "../modules/store";
import { connect } from "react-redux";
import Header from "./header";

var token = "perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL";

const Issues = ({ issues, filtredIssues, getIssues, getFiltredIssues }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    filtered(q);
  }, [q]);
  useEffect(() => {
    axios
      .get("/api/issues", {
        params: {
          fields: "id,summary,project(name)",
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFilteredData(res.data);
      });
    getIssues();

  }, []);
  const filtered = (e) => {
    let filtered;
    if (e.length > 2) {
      filtered =
        issues &&
        issues.filter((item) => {
          return item.project.name.toLowerCase().startsWith(e.toLowerCase());
        });
      if (filtered.length > 0) {
        getFiltredIssues(filtered[0].project.name);
        setFilteredData(filtredIssues);
      } else {
        setFilteredData([]);
      }
    } else {
      filtered =
        issues &&
        issues.filter((item) => {
          return item.project.name.toLowerCase().startsWith(e.toLowerCase());
        });
      setFilteredData(filtered);
    }
    setFilteredData(filtered);
  };

  return (
    <div>
      <Header />
      <div>
        <input
          type="search"
          placeholder="Search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>SUMMARY</th>
            <th>PROJECT NAME</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.summary}</td>
              <td>{item.project.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default connect(
  ({ globalState }) => ({
    issues: globalState.issues,
    filtredIssues: globalState.filtredIssues,
  }),
  {
    getIssues: getIssuesAction,
    getFiltredIssues: getFiltredIssuesAction,
  }
)(Issues);
