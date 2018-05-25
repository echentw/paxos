import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app';

// interface HelloProps { compiler: string; framework: string; }
//
// // 'HelloProps' describes the shape of props.
// // State is never set so we use the '{}' type.
// class Hello extends React.Component<HelloProps, {}> {
//   render() {
//     return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//   }
// }

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);