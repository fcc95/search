import HighlightedText from "components/highlightedText/HighlightedText";
import "./ListItem.scss";

type IProps = {
  title: string;
  inputText: string;
  isActive: boolean;
  onToggle: () => void;
};

const listItem = ({ title, isActive, inputText, onToggle }: IProps) => (
  <div className={`item ${isActive ? "active" : ""}`} onClick={onToggle}>
    <HighlightedText text={title} highlight={inputText} />
  </div>
);

export default listItem;
