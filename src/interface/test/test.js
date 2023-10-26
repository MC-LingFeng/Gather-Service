import InterfaceCreate from "../../../utils/interface/index.js";
const test = (req, res) => {
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
}
const test1 = (req, res) => {
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
}
const test2 = (req, res) => {
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
}

const test3 = createInterface({
  name: 'test3',
  methods: 'get',
  callback: () => {
  
  },
  header,
  app,
})

export default {
  test, test1, test2
}