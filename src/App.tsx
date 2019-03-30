import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <form className="form">
          <div className="form__item">
            <div className="form__item-label">Text field</div>
            <div className="form__item-field">
              <input type="text" value={undefined} />
            </div>
          </div>
          <div className="form__item">
            <div className="form__item-label">Radio buttons</div>
            <div className="form__item-field">
              <label htmlFor="radio1">
                <input id="radio1" type="radio" name="radio" value={1} />
                <span>Radio1</span>
              </label>
              <label htmlFor="radio2">
                <input id="radio2" type="radio" name="radio" value={2} />
                <span>Radio2</span>
              </label>
              <label htmlFor="radio3">
                <input id="radio3" type="radio" name="radio" value={3} />
                <span>Radio3</span>
              </label>
            </div>
          </div>
          <div className="form__item">
            <div className="form__item-label">Checkboxes</div>
            <div className="form__item-field">
              <label htmlFor="checkbox1">
                <input id="checkbox1" type="checkbox" name="checkbox" value={1} />
                <span>Checkbox1</span>
              </label>
              <label htmlFor="checkbox2">
                <input id="checkbox2" type="checkbox" name="checkbox" value={2} />
                <span>Checkbox2</span>
              </label>
              <label htmlFor="checkbox3">
                <input id="checkbox3" type="checkbox" name="checkbox" value={3} />
                <span>Checkbox3</span>
              </label>
            </div>
          </div>
          <div className="form__item">
            <div className="form__item-label">Selection</div>
            <div className="form__item-field">
              <select name="select">
                <option value={1}>option1</option>
                <option value={2}>option2</option>
                <option value={3}>option3</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
