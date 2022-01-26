import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getWorkItems as getWorkItemsAction } from "../modules/api";
import Header from "./header";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
  section: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",


  },
  column: {
    width: "30%"
  },
});

const WorkItems = ({ workItems, getWorkItems }) => {
  let { id } = useParams();
  useEffect(() => {
    getWorkItems(id);
  }, []);
  return (
    <div>
      <Header />
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            {workItems.map((item) => {
              let time = "";
              let hours = Math.trunc(item.duration.minutes / 60);
              let minutes = item.duration.minutes % 60;
              time = hours + " hour " + minutes + " minutes ";
              return (
                <View style={styles.section} key={item.id}>
                  <View style={styles.column}>
                    <Text>{item.author.name}</Text>

                  </View>

                  <View style={(styles.column, styles.rightColumn)}>
                    <Text>{time}</Text>
                  </View>
                </View>
              );
            })}
          </Page>
        </Document>
      </PDFViewer>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {workItems.map((item) => {
            let time = "";
            let hours = Math.trunc(item.duration.minutes / 60);
            let minutes = item.duration.minutes % 60;
            time = hours + " hour " + minutes + " minutes ";
            return (
              <tr key={item.id}>
                <td>{item.author.name}</td>
                <td>{time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default connect(
  ({ globalState }) => ({ workItems: globalState.workItems }),
  {
    getWorkItems: getWorkItemsAction,
  }
)(WorkItems);
