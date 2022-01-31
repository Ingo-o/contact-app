import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import {useState, useEffect} from "react";
import {v4 as uuidv4} from 'uuid';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ContactDetails from "./ContactDitails";
import api from '../api/contacts';
import EditContact from "./EditContact";

const App = () => {
    /*const LOCAL_STORAGE_KEY = "contacts";*/
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    }

    const addContactHandler = async (contact) => {
        const request = {
            id: uuidv4(),
            ...contact
        }

        const response = await api.post("/contacts", request);
        setContacts([...contacts, response.data]);
    };

    const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const {id} = response.data;
        setContacts(contacts.map(contact => {
            return contact.id === id ? {...response.data} : contact;
        }))
    };

    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`)
        const newContactList = contacts.filter(contact => contact.id !== id)
        setContacts(newContactList);
    }

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newContactList = contacts.filter(contact => {
                return Object.values(contact)
                    .join("")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
            setSearchResults(newContactList);
        } else {
            setSearchResults(contacts);
        }
    };

    useEffect(() => {
        /*const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (retrieveContacts) setContacts(retrieveContacts)*/
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) setContacts(allContacts);
        };
        getAllContacts();
    }, [])

    useEffect(() => {
        /*localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));*/
    }, [contacts])

    return (
        <div className="ui container">
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path='/' exact
                           render={(props) =>
                               <ContactList {...props} contacts={searchTerm.length < 1 ? contacts : searchResults}
                                            removeContact={removeContactHandler}
                                            term={searchTerm} searchKeyword={searchHandler}/>}/>
                    <Route path='/add' render={(props) =>
                        <AddContact {...props} addContactHandler={addContactHandler}/>}/>
                    <Route path='/edit' render={(props) =>
                        <EditContact {...props} updateContactHandler={updateContactHandler}/>}/>
                    <Route path='/contact/:id' component={ContactDetails}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
