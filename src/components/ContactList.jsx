import ContactCard from "./ContactCard";
import {Link} from "react-router-dom";
import {useRef} from "react";

const ContactList = (props) => {
    const inputEl = useRef("");

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} key={contact.id} removeContact={props.removeContact}/>
        )
    })

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }

    return (
        <div className="main margin-top">
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue float-right">Add contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input width-100">
                    <input type="text" placeholder="Search contact" className="prompt" value={props.term}
                           onChange={getSearchTerm} ref={inputEl}/>
                    <i className="search icon"/>
                </div>
            </div>
            <div
                className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No contacts available"}</div>
        </div>
    );
}

export default ContactList;