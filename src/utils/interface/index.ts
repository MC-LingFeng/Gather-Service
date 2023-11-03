import InterfaceCreate from './InterfaceCreate';

const createInterface = ({
  name,
  methods,
  callback,
  header,
  app
}) => {
  const interfaceChild = new InterfaceCreate({ methods, name, header });
  if (methods === undefined || methods === 'get') {
    app.get(`/${name}`, function(req, res) {
      interfaceChild.callback(callback, req, res);
    });
  } else if (methods === 'post') {
    app.post(`/${name}`, function(req, res) {
      interfaceChild.callback(callback, req, res);
    });
  }
  return interfaceChild;
};

export default createInterface;
