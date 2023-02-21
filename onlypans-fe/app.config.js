module.exports = ({config}) => {  
  config.extra = {
    apiBaseUrl: 'http://172.17.122.74:4000',
    ...config.extra,
  }
  return config;
};