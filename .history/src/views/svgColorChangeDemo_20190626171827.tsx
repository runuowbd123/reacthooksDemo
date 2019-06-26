import * as React from 'react';

class SvgColorChangeDemo extends React.Component<any> {

    public render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '50px',
                    // tslint:disable-next-line:object-literal-sort-keys
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    className="section"
                >
                    <div className="image">
                        <img
                            alt="logo"
                            src={`/public/img/logo.svg`}
                        />
                    </div>
                    <span
                        style={{
                            marginLeft: '10px',
                        }}
                    >
                        你好我是LOGO
                    </span>
                </div>
            </div>
        );
    }
}

export default SvgColorChangeDemo;
