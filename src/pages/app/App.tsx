import { useEffect, useRef, useState } from "react";
import List from "../../components/list/List";
import Search from "../../components/search/Search";
import PersonDetail from "../../components/personDetail/PersonDetail";
import { useAppDispatch, useAppSelector } from "../../store";
import { User } from "../../store/user/user.types";
import { getUser } from "../../store/user/userAction";
import { clearSearchResult, selectUser } from "../../store/user/user";
import { debounce } from "lodash-es";
import "./App.scss";

const App = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const { users, selectedUser, loading, hasError } = useAppSelector(
    (state) => state.user
  );

  const debouncedSearch = useRef(
    debounce(async (text: string) => {
      if (text.length > 1) {
        dispatch(getUser({ text }));
      } else {
        dispatch(clearSearchResult());
      }
    }, 400)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onToggleUser = (user: User | null) => {
    dispatch(selectUser(user));
  };

  async function handleChange(value: string) {
    setText(value);
    debouncedSearch(value);
  }

  return (
    <div className="App">
      <Search value={text} updateText={handleChange} />
      <List
        users={users}
        selectedUser={selectedUser}
        onToggleUser={onToggleUser}
        loading={loading === "pending"}
        error={hasError}
      />
      {selectedUser && <PersonDetail user={selectedUser} />}
    </div>
  );
};

export default App;
