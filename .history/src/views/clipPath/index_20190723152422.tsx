import * as React from 'react';

export interface HomeProps {
    data: object;
}

interface HomeState {
    res: any;
}

class FlexBugDemo extends React.Component<HomeProps, HomeState> {

    public state: HomeState = {
        res: null,
    };

    public render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 50,
                    // tslint:disable-next-line:object-literal-sort-keys
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div className="we sun"/>
            </div>
        );
    }
}

export default FlexBugDemo;
