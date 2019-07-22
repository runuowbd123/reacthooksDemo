import * as React from 'react';
export interface UserState {
    c: number;
}

const initialState: UserState = {
    c: 0,
};

const ExampleContext = React.createContext(initialState);

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
            return (
                <div>
                    111
                </div>
            );
    }
}
export default ExampleContext;
