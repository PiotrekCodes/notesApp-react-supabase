import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const NotesCard = ({ note, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", note.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(note.id);
    }
  };
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="buttons">
        <Link to={"/" + note.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default NotesCard;
