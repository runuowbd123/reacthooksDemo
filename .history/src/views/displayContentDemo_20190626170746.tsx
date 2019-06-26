import * as React from 'react';

export interface HomeProps {
    data: object;
}

interface HomeState {
    res: any;
}

class DisplayContentDemo extends React.Component<HomeProps, HomeState> {

    public state: HomeState = {
        res: null,
    };

    public render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 150,
                    // tslint:disable-next-line:object-literal-sort-keys
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <div
                        style={{
                            border: '1px solid red',
                            height: '200px',
                            width: '200px',
                        }}
                    >
                        box1
                    </div>
                    <section
                        style={{
                            background: 'red',
                        }}
                    >
                        <div
                            style={{
                                border: '1px solid red',
                                height: '200px',
                                width: '200px',
                            }}
                        >
                            box5
                        </div>
                        <div
                            style={{
                                border: '1px solid red',
                                height: '200px',
                                width: '200px',
                            }}
                        >
                            box6
                        </div>
                    </section>
                    <div
                        style={{
                            border: '1px solid red',
                            height: '200px',
                            width: '200px',
                        }}
                    >
                        box3
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        marginTop: '200px',
                    }}
                >
                    <div
                        style={{
                            border: '1px solid red',
                            height: '200px',
                            width: '200px',
                        }}
                    >
                        box1
                    </div>
                    <section
                        style={{
                            background: 'red',
                            display: 'contents',
                        }}
                    >
                        <div
                            style={{
                                border: '1px solid red',
                                height: '200px',
                                width: '200px',
                            }}
                        >
                            box5
                        </div>
                        <div
                            style={{
                                border: '1px solid red',
                                height: '200px',
                                width: '200px',
                            }}
                        >
                            box6
                        </div>
                    </section>
                    <div
                        style={{
                            border: '1px solid red',
                            height: '200px',
                            width: '200px',
                        }}
                    >
                        box3
                    </div>
                </div>

            </div>
        );
    }
}

export default DisplayContentDemo;
