import { Link } from "react-router-dom";

const NotesCard = ({ note }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="buttons">
        <Link to={"/" + note.id}>
          <i className="material-icons">edit</i>
        </Link>
      </div>
    </div>
  );
};

export default NotesCard;
