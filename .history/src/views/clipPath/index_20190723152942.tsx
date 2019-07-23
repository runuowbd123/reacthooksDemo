import * as React from 'react';
import './index.scss';

class ClipPath extends React.Component {

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
                {/* <div className="we sun"/> */}
            </div>
        );
    }
}

export default ClipPath;
