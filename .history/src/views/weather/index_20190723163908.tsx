import * as React from 'react';
import './index.scss';

class Weather extends React.Component {

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
                    overflow: 'auto',
                }}
            >
                <section>
                    太阳Demo
                    <div className="we sun"/>
                </section>

            </div>
        );
    }
}

export default Weather;
