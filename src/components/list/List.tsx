import { User } from "../../store/user/user.types";
import ListItem from "../listItem/ListItem";
import "./List.scss";

type IProps = {
  users: Array<User>;
  selectedUser: User | null;
  loading: boolean;
  error: boolean;
  onToggleUser: (user: User | null) => void;
};

const List = ({
  users,
  selectedUser,
  loading,
  error,
  onToggleUser,
}: IProps) => {
  if (error) {
    return <div>Something wrong</div>;
  }

  if (loading) {
    return <div>...loading</div>;
  }

  if (!Boolean(users.length)) {
    return <div>Users not fount</div>;
  }

  return (
    <div className="list">
      {users?.map((user: User, index: number) => (
        <ListItem
          key={index}
          title={user.name}
          isActive={user.name === selectedUser?.name}
          onToggle={() => {
            onToggleUser(user.name === selectedUser?.name ? null : user);
          }}
        />
      ))}
    </div>
  );
};

export default List;
