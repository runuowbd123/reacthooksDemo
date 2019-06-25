import * as React from 'react';

export default class Welcome extends React.Component {

    public render() {
        return (
            <div>
                i'm sidebar
                {
                    this.props.children || '没路由'
                }
            </div>
        );
    }
}
