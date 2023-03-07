import { User } from "../../store/user/user.types";
import ListItem from "../listItem/ListItem";
import "./List.scss";

type IProps = {
  users: Array<User>;
  selectedUser: User | null;
  loading: boolean;
  error: boolean;
  onToggleUser: (userId: string) => void;
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
      {users?.map((user: User) => (
        <ListItem
          key={user.id}
          title={user.name}
          isActive={user.name === selectedUser?.name}
          onToggle={() => {
            onToggleUser(user.id);
          }}
        />
      ))}
    </div>
  );
};

export default List;
