import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers as getUsersAction } from "../modules/store";
import { getFiltredIssues as getFiltredIssues } from "../modules/store";

const User = ({ users, getUsers }) => {
  let user;
  useEffect(() => {
    getUsers();
  }, []);
  let { login } = useParams();
  user = users.find((v) => v.login === login);
  return (
    <div>
        {
            user?.lenght> 0
            ? <div></div>
            : <div>
                <p>id: {user?.id}</p>
                <p>login: {user?.login}</p>
                <p>type: {user?.$type}</p>
                <p>name: {user?.name}</p>
                <p>email: {user?.email}</p>
            </div>
        }

    </div>
  );
};
export default connect(
    ({ globalState}) => ({ users: globalState.users }), {
  getUsers: getUsersAction,
})(User);
