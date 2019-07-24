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
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <section>
                        <div className="title">
                            太阳
                        </div>
                        <div className="we sun"/>
                    </section>
                    <section>
                        <div className="title">
                            阴天
                        </div>
                        <div className="we cloudy"/>
                    </section>
                    <section>
                        <div className="title">
                            下雨
                        </div>
                        <div className="we rainy"/>
                    </section>
                    <section>
                        <div className="title">
                            雷雨
                        </div>
                        <div className="we thunder">
                            <div className="flash" />
                            <div className="flash" style={{ left: '40%' }} />
                            <div className="flash" style={{ left: '30%', top: '60%' }} />
                        </div>
                    </section>

                </div>

            </div>
        );
    }
}

export default Weather;
