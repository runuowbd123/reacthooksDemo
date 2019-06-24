import * as React from 'react';

import './style.scss';

const Background: React.SFC = (props) => {
    return (
        <div className="background">
            {
                props.children
            }
        </div>
    );
};
export default Background;
