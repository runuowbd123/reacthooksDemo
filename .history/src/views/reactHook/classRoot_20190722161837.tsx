import * as React from 'react';
import { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import Child from './child';

const initialState = {
    c: 0,
  };
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
export const ExampleContext = React.createContext(null);
class App extends React.Component {
    public click = () => {
        console.log('111');
    }
    public render() {
        const [dataContext, dispatch] = useReducer(reducer, initialState);
        return(
            <ExampleContext.Provider value={{dataContext, dispatch}}>
                <div>
                    <br/>
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <button onClick={() => {dispatch({type: 'increment', payload: 5}); }}>让c+5</button>
                    <br/>
                    dataContext中的c：{dataContext.c}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Child onClick1={this.click} onClick2={this.click} />
                </div>
            </ExampleContext.Provider>
        );
    }
}

export default ExampleContext;
