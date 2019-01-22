import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      comments: []
    }
    if(window.localStorage.getItem('chat')){
      let res = JSON.parse(window.localStorage.getItem('chat'));
      window.qwe = res;
      res.forEach(message => {
        if(message!==null) this.state.comments.push(message);
      });
    } else {
      this.state.comments.push({ me: false, name: 'Гость', text: 'Привет мир!', time: '' });
    }
  }

  addComment(value) {
    const todo = {
          me: true,
          name: this.state.name,
          text: value,
          time: new Date()
        };
    this.state.comments.push(todo);
    const comments = this.state.comments;
    this.setState({ comments });
    window.localStorage.setItem('chat', JSON.stringify(this.state.comments));
  }

  deleteComment(key) {
    delete this.state.comments[key];
    const comments = this.state.comments;
    this.setState({ comments });
    window.localStorage.setItem('chat', JSON.stringify(this.state.comments));
  }

  render() {
    return (
      <div className="App">
        <ol>
          {
            this.state.comments.map((comment, i) => {
              const checked = comment.checked?'checked ':'';
              const deleteButton = comment.me?<button onClick={(ev)=>{
                    this.deleteComment(i);
                  }}>x</button>:'';
              return (
                <li
                key={i}
                title={comment.time}
                className={checked + 'unselectable'}>
                  {comment.name + ": " + comment.text}
                  { deleteButton }
                </li>
              );
            })
          }
        </ol>
        <p><b>Комментировать:</b></p>
        <input type='text' placeholder='Имя'
          onKeyUp={(ev)=>{
            this.setState({ name: ev.target.value })
          }} /> <br/>
        <input type='text' placeholder='Текст комментария'
          onKeyUp={(ev)=>{
            if(ev.keyCode === 13 && ev.target.value){
              if(this.state.name.length > 0){
                this.addComment(ev.target.value);
                ev.target.value = '';
              } else {
                alert('Представьтесь пожалуйста.');
              }
            }
          }} />
      </div>
    );
  }
}

export default App;