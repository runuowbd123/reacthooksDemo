import * as React from 'react';
import { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import { ExampleContext } from './root';

const Child = (props: any) => {
    const [child, setName] = useState('child');
    const inputRef = useRef();
    const exampleContext = useContext(ExampleContext);

    useEffect(() => {
        console.log(props.onClick1);
    }, [props.onClick1]); // 用于监听props中传过来的onClick1是否改变，主要用来测试usecallback

    useEffect(() => {
        console.log(props.onClick2);
    }, [props.onClick2]); // 用于监听props中传过来的onClick2是否改变，主要用来测试useMeno

    return (
        <div style={{borderTop: '1px solid #000'}} onClick={props.onClick1}>
            {child}
            <br/>
            <br/>
            <button
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() => {
                    exampleContext.dispatch({
                        payload: 5,
                        type: 'decrement',
                    });
                }}
            >
                使c-5
            </button>
            <button
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() => {
                    exampleContext.dispatch({
                        payload: 0,
                        type: 'set',
                    });
                }}
            >
                重置c
            </button>
            <br/>
            dataContext中的数据c：{exampleContext.dataContext.c}
            <br/>
            <br/>
            <br/>
            <input type="text" ref={inputRef} />
            <br/>
            <button
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() => {console.log(inputRef); }}
            >
                打印inputRef的值
            </button>
        </div>
    );
};

export default Child;
