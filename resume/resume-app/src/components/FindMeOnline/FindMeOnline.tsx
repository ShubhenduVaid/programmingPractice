import { FindMeOnline as FindMeOnlineType } from "../../Information";
import "./FindMeOnline.css";

interface FindMeOnlineProps {
  findMeOnline: FindMeOnlineType;
}

export default function FindMeOnline({
  findMeOnline: { heading, links },
}: FindMeOnlineProps) {
  return (
    <div className="find-me-online-container">
      <strong>{heading}</strong>
      <div className="links">
        {links.length > 0 &&
          links.map((link) => (
            <p key={link.name}>
              {`🔗 `}
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            </p>
          ))}
      </div>
    </div>
  );
}
