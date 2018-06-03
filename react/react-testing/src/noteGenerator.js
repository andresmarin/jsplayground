import React from "react";
import axios from "axios";
import Note from "./note";

export default class NoteGenerator extends React.Component {

    state = {
        note: null,
        loading: false
    }

   
    loadNote = async () => {
        this.setState({ loading: true });

        const { data: { value: { note } } } = await axios.get("https://api.icndb.com/jokes/random");
    
        this.setState({ loading: false, note });
      };

 

      render() {
        const { note, loading } = this.state;
    
        return (
          <React.Fragment>
            {!note && !loading && <div>Click the button to load a JavaScript tip!</div>}
            {loading && <div>Loading...</div>}
            {note && !loading && <Note text={note} />}
            
    
            <button onClick={this.loadNote} type="button">
            Load a JS tip
            </button>
          </React.Fragment>
        );
    }
}
