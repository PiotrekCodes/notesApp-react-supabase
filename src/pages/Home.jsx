import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import NotesCard from "../components/NotesCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select();

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
  }, []);
  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {notes && (
        <div className="notes">
          <div className="notes-grid">
            {notes.map((note) => (
              <NotesCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
