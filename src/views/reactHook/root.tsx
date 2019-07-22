import * as React from 'react';
import { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import Child from './child';

const initialState = {
    c: 0,
  };
function reducer(state: any, action: any) {
    switch (action.type) {
      case 'increment':
        return { c: state.c + action.payload };
      case 'decrement':
        return { c: state.c - action.payload };
      case 'set':
        return { c: action.payload };
      default:
        throw new Error();
    }
  }

let timer: any = null;
export const ExampleContext = React.createContext(null);
const App = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('hhhhh');
    const [dis, setDis] = useState(0);
    const [dataContext, dispatch] = useReducer(reducer, initialState);

    // 类似于componentDidMount 和 componentDidUpdate:
    useEffect(() => {
        // 更新文档的标题
        document.title = `You clicked ${count} times`;
    }, [name]); // 只有当count的值发生变化时，才会重新执行
    useEffect(() => {
        console.log('didmount');
        timer = setInterval(() => {
            setDis((preDis) => { // 调用usestate的函数改变state的时候他的默认里面的第一个传参就是之前的state值
                console.log(preDis);
                return preDis + 1;
            });
        }, 1000);
        setTimeout(() => {
            dispatch({type: 'set', payload: 125});
        }, 1000);
        return () => {
            console.log('unmount');
            clearInterval(timer); // 销毁的时候清除定时器
        };
    }, []); // 空数组的时候代表不监听任何参数变化，即只有在组件初始化或销毁的时候才会触发，用来代替 componentDidMount 和 componentWillUnmount

    const usecall = useCallback(() => {
        console.log(name);
    }, [name]);
    const usecall1 = useMemo(() => () => {
        console.log(name);
    }, [name]);

    return (
        <ExampleContext.Provider value={{dataContext, dispatch}}>
            <div>
                <p>
                    name的值：{name}
                </p>
                <p>You clicked {count} times</p>
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <button onClick={() => setCount(count + 1)}>
                    make count plus 1
                </button>
                            {/* tslint:disable-next-line:jsx-no-lambda */}
                <button onClick={() => setName(name + count)}>
                    change name
                </button>
                <br/><br/>
                <div>计时器： {dis}</div>
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <button onClick={() => clearInterval(timer)}>销毁定时器</button>
                <br/>
                <br/>
                {/* tslint:disable-next-line:jsx-no-lambda */}
                <button onClick={() => {dispatch({type: 'increment', payload: 5}); }}>让c+5</button>
                <br/>
                dataContext中的c：{dataContext.c}

                <br/>
                <br/>
                <br/>
                <br/>

                {/* tslint:disable-next-line:jsx-no-lambda */}
                <Child onClick1={usecall} onClick2={usecall1} />
            </div>
        </ExampleContext.Provider>
    );
};

export default hot(module)(App);
