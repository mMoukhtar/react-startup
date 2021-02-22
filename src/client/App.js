import React, { Component } from 'react';

/* 
----->
Usually ES6 is only supporting static importing === import has to be at the begining of ES6 file
This come with a cost that we need to import all components even if we won't use them!

Normal import:
import Grid from './components/Grid';

Now solution is using the help of @babel dynamic loading syntax plugin
We use React Lazy with dynamic loading to generate components that is loaded once used
Finally we need to implement React.Suspense in the routing section

Lazy dynamic import:
const Grid = React.lazy(() => import('./components/Grid'));
------>
*/

class App extends Component {
  render() {
    return <div>hello world!</div>;
  }
}

export default App;
