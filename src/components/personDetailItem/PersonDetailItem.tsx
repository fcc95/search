import "./PersonDetailItem.scss";

type IProps = {
  title: string;
  value: string | Array<string>;
};

const PersonDetailItem = ({ title, value }: IProps) => {
  let showValue = value;
  if (typeof value === "object") {
    showValue = value.map((item: string) => `${item} \n`);
  }

  return (
    <div className="personDetail-item">
      <b className="personDetail-label">{title}:</b>
      <span className="personDetail-value">{showValue}</span>
    </div>
  );
};

export default PersonDetailItem;
