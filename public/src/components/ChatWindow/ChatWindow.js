import React, { Component } from "react";
import './ChatWindow.css';

import axios from "axios";
import url from '../../api'

import Message from './Message/Message';

import dateCreator from '../../utils/dateCreator';

export default class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      text: '',
      user: ''
    };

    this.handleChange = this.handleChange.bind( this );
    this.createMessage = this.createMessage.bind( this );
    this.editMessage = this.editMessage.bind( this );
    this.removeMessage = this.removeMessage.bind( this );
    this.addUserName = this.addUserName.bind( this );
  }

  componentDidMount() {
    axios.get( url ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  handleChange( event ) {
    this.setState({ text: event.target.value });
  }

  addUserName( event ) {
    this.setState({ user: event.target.value })
  }

  createMessage( event ) {
    const { text, user } = this.state;
    if ( event.key === "Enter" && text.length !== 0 ) {
      axios.post( url, { text, time: dateCreator(), user } ).then( response => {
        this.setState({ messages: response.data });
      });

      this.setState({ text: '' });
    }
  }

  editMessage( id, text ) {
    console.log( 'editMessage:', id, text ); 
    axios.put( url + `/${id}`, { text } ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  removeMessage( id ) {
    axios.delete( url + `/${id}` ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  render() {
    return (
      <div id="ChatWindow__container">
        <div id="ChatWindow__messagesParentContainer">
          <div id="ChatWindow__messagesChildContainer">
            {
              this.state.messages.map( message => (
                <Message id={ message.id} 
                        key={ message.id } 
                        text={ message.text } 
                        time={ message.time } 
                        edit={ this.editMessage }
                        user={ message.user } 
                        remove={ this.removeMessage } />
              ))
            }
          </div>
        </div>
        <div id="ChatWindow__newMessageContainer">
          <input placeholder="What's on your mind? Press enter to send." 
                 onKeyPress={ this.createMessage }
                 onChange={ this.handleChange }
                 value={ this.state.text }
          />
          <input className="userNameInput"placeholder="UserName"
                  onChange={this.addUserName}
                  onKeyPress={ this.createMessage }
                  value={ this.state.user }/>
        </div>
      </div>
    )
  }
}