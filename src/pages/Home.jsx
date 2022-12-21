import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import NotesCard from "../components/NotesCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [notes, setNotes] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch notes");
        setNotes(null);
        console.log(error);
      }
      if (data) {
        setNotes(data);
        setFetchError(null);
      }
    };
    fetchNotes();
  }, [orderBy]);
  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {notes && (
        <div className="notes">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
          </div>
          <div className="notes-grid">
            {notes.map((note) => (
              <NotesCard key={note.id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
