import React, {Component} from 'react';

class Switch extends Component {

  constructor ( props ) {
      super( props );
  
  this.state = {
    isChecked: false
  }
  }

componentWillMount () {
  this.setState( { isChecked: this.props.isChecked } );
}


  render () {

      return(
          <div className="switch-container">
              <label>
                  <input ref="switch" checked={ this.state.isChecked } onChange={ this._handleChange } className="switch" type="checkbox" />
                  <div>
            
                      <div></div>
                  </div>
              </label>
          </div>
      );
  }


  _handleChange = () => {
    this.setState( { isChecked: !this.state.isChecked } );
  }

}

export default Switch;