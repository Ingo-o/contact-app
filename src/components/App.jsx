import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

const App = () => {

    const contacts = [
        {
            id: "1",
            "name": "Ingo",
            "email": "Ingo-o@yandex.ru",
        },
        {
            id: "2",
            "name": "KesH",
            "email": "keshne@ya.ru",
        }
    ];

    return (
        <div className="ui container">
            <Header/>
            <AddContact/>
            <ContactList contacts={contacts}/>
        </div>
    );
}

export default App;

// https://cdnjs.com/libraries/semantic-ui
