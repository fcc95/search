import "./Search.scss";

type IProps = {
  value: string;
  updateText: (value: string) => void;
};

const Search = ({ value, updateText }: IProps) => {
  return (
    <div className="search" data-testid="SearchComponent-wrapper">
      <input
        data-testid="SearchComponent-input"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateText(e.target.value)
        }
        placeholder="Search"
      />
    </div>
  );
};
export default Search;
