import React from 'react';

class CCLifecycle extends React.Component {
  constructor() {
    super();
    this.state = { total: 0 };
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDid ');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate ');
  }
  componentWillUnmount() {
    console.log('compemtWillUnmount');
  }
  render() {
    console.log('render');
    return (
      <>
        <h1
          onClick={() => {
            this.setState({ total: this.state.total + 1 });
          }}
        >
          {this.state.total}
        </h1>
      </>
    );
  }
}
export default CCLifecycle;
