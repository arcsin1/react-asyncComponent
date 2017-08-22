'use strict'
import React from 'react'
import Loading from 'components/loading' //一个loading页面
import Error from 'components/error'  //一个错误页面

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = {Component: AsyncComponent.Component}

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({Component})
        })
      }
    }
    render() {
      const {Component} = this.state
      if (Component) {
        if(Component == 101){
          return <Error { ...this.props} text={"加载页面失败"} error={101} />
        }
        else{
          return <Component { ...this.props} />
        }
      }
      return (<Loading />)
    }
  }
}

export default asyncComponent


// 用法1:(在路由配置)
// import asyncComponent from 'components/AsyncComponent';
// const userRouter = asyncComponent(() => import('components/user').then(module => module.default).catch((err)=>{return 101}))

//用法2:(组件目录下面加载 需要一个index.js)
// import asyncComponent from 'components/AsyncComponent';
// const AsyncDashboard = asyncComponent(() =>
//   import('./Dashboard').then(module => module.default)
// );
//
// export default AsyncDashboard;
