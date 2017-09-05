import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import NewsHeader from './NewsHeader'
import NewsFooter from './NewsFooter'



export default class App extends Component {
  render() {
    return(
      <div>
        <NewsHeader> </NewsHeader>
        {this.props.children}
        <NewsFooter> </NewsFooter>
      </div>


    )
  }
}