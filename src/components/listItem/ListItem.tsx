import "./ListItem.scss";

type IProps = {
  title: string;
  isActive: boolean;
  onToggle: () => void;
};

const listItem = ({ title, isActive, onToggle }: IProps) => (
  <div className={`item ${isActive ? "active" : ""}`} onClick={onToggle}>
    {title}
  </div>
);

export default listItem;
