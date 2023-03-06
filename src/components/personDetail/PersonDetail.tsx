import PersonDetailItem from "../personDetailItem/PersonDetailItem";
import { User } from "../../store/user/user.types";
import "./PersonDetail.scss";

type IProps = {
  user: User;
};

type IVisibleProps = {
  label: string;
  propertyName: keyof User;
};

const visibleProperties: Array<IVisibleProps> = [
  { label: "Name", propertyName: "name" },
  { label: "Height", propertyName: "height" },
  { label: "Mass", propertyName: "mass" },
  { label: "Hair Color", propertyName: "hair_color" },
  { label: "Skin Color", propertyName: "skin_color" },
  { label: "Eye Color", propertyName: "eye_color" },
  { label: "Birth Year", propertyName: "birth_year" },
  { label: "Gender", propertyName: "gender" },
  { label: "Star Ships", propertyName: "starships" },
];

const PersonDetail = ({ user }: IProps) => {
  return (
    <div className="personDetail-list">
      {visibleProperties.map((item, index) => (
        <PersonDetailItem
          key={index}
          title={item.label}
          value={user[item.propertyName]}
        />
      ))}
    </div>
  );
};

export default PersonDetail;
