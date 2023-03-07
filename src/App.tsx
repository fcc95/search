import { useMemo, useState } from "react";
import List from "./components/list/List";
import Search from "./components/search/Search";
import PersonDetail from "./components/personDetail/PersonDetail";
import { useAppDispatch, useAppSelector } from "./store";
import { getUser } from "./store/user/userAction";
import { clearSearchResult, selectUser } from "./store/user/userSlice";
import { debounce } from "lodash-es";
import "./App.scss";

const App = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const { users, selectedUser, loading, hasError } = useAppSelector(
    (state) => state.user
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        if (text.length > 1) {
          dispatch(getUser({ text }));
        } else {
          dispatch(clearSearchResult());
        }
      }, 400),
    [dispatch]
  );

  const onToggleUser = (userId: string) => {
    dispatch(selectUser(userId));
  };

  const handleChange = (value: string) => {
    setText(value);
    debouncedSearch(value);
  };

  return (
    <div className="App">
      <Search value={text} updateText={handleChange} />
      <List
        users={users}
        inputText={text}
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
