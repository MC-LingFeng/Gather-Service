import express from 'express';

export default class InterfaceCreate {
  constructor(props) {
    this.state = {
      methods: props?.methods,
      name: props?.name,
      header: props?.header,
      app: props?.app ?? express()
    };
  }
  getSate() {
    return this.state;
  }
  getValue(value) {
    return this.state[value];
  }
  callback(callback, req, res) {
    if (req && res) {
      Object.keys(this.state.header).forEach(item => {
        res.setHeader(item, this.state.header[item]);
      });
    }

    if (callback) {
      callback();
    }
  }
}

