import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      comm: '(pourquoi tu aimes ce film? qu\'est ce qui t\'a marqué? etc...)'
    }

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm(e) {
    e.preventDefault();
    const url = 'http://92.175.11.66:3001/api/quests/movies/'
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
     };
    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Film ajouté avec l'ID ${res}!`);
        }
      }).catch(e => {
        console.error(e);
        alert('Erreur lors de l\'ajout d\'un film');
      })
   }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.submitForm} >
          <label htmlFor='name'>Nom du film : 
            <input onChange={this.onChange} value={this.state.name} type='text' id= 'name' name='name' />
          </label><br/>
          
          <label htmlFor='url'>URL du poster : 
            <input onChange={this.onChange} value={this.state.url} type='text' id='url' name='url' />
          </label><br/>
          
          <label htmlFor='comm'>Commentaire :</label>
          <textarea onChange={this.onChange} id='comm' name='comm' rows='10' cols='50' value={this.state.comm}></textarea><br/>

          <input type='submit' value='Envoyer'/>
        </form>
      </div>
    );
  }
}

export default App;
