
import { useEffect } from "react";
import {connect} from 'react-redux'
import { useNavigate } from "react-router";
import { getUsers as getUsersAction } from "./modules/store";

function App({users, getUsers}) {
  let navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, [])
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>LOGIN</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody>

          {
              users.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.login}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate(`/${item.login}`);
                      }}
                    >
                      Перейти в карточку пользователя
                    </button>
                  </td>
                </tr>
              ))
           }
        </tbody>
      </table>
    </div>
  );
}

export default connect(
  ({globalState}) => ({users: globalState.users}),
  {
    getUsers: getUsersAction
  }
)(App);
