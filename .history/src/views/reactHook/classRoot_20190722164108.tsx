import * as React from 'react';

import Child from './child';

function reducer(state: any, action: any) {
    switch (action.type) {
      case 'increment':
        return { c: state.c + action.payload };
      case 'decrement':
        return { c: state.c - action.payload };
      case 'set':
        return { c: action.payload };
      default:
        throw new Error();
    }
  }
const initialState = {
c: 0,
};

const ExampleContext = React.createContext(initialState);

const [dataContext, dispatch] = React.useReducer(reducer, initialState);

export class App extends React.Component {

    public componentDidMount() {
        console.log('didmount');
    }

    public render() {
        // if (this.state.name !== '') {
        //     return (
        //         <ExampleContext.Provider
        //             value={{dataContext, dispatch}}
        //         >
        //             <Child onClick1={usecall} onClick2={usecall1} />
        //         </ExampleContext.Provider>
        //     );
        // } else {
        //     return (
        //         <div className="absolute-middle txt-center">
        //             <Loading tip="加载中，请稍等..."/>
        //         </div>
        //     );
        // }
            // return (
            //     <div>
            //         111
            //     </div>
            // );
        return (
            <ExampleContext.Provider
                value={null}
            >
                <Child/>
            </ExampleContext.Provider>
        );
    }
}
export default ExampleContext;
