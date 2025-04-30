import "./Header.css";
import { Header as HeaderProps } from "../../Information";

export default function Header({
  name,
  designation,
  contactInfo,
}: HeaderProps) {
  return (
    <div className="header">
      <div>
        <h1>{name}</h1>
        <h2>{designation}</h2>
        <div className="contact-info">
          <span>@ {contactInfo.email}</span>
          <span>&#128222; {contactInfo.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}
