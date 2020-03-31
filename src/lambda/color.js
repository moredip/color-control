const axios = require('axios').default;

const IO_API_KEY = process.env.IO_API_KEY;
const IO_USERNAME = process.env.IO_USERNAME;
const IO_FEED_NAME = process.env.IO_FEED_NAME;

const ioClient = axios.create({
  baseURL: `https://io.adafruit.com/api/v2/${IO_USERNAME}/feeds/${IO_FEED_NAME}`,
  headers: {
    'X-AIO-Key': IO_API_KEY
  }
})

exports.handler = async event => {
  console.log({event});

  switch(event.httpMethod.toUpperCase()){
  case 'PUT':
    return putHandler(event);
  case 'GET':
    return getHandler(event);
  default:
    return {
      statusCode: 405
    };
  }
}

const getHandler = async event => {
  const response = await ioClient.get('/data/last');
  console.log({axiosResponse:response});

  return {
    statusCode: 200,
    body: response.data.value
  };
}

const putHandler = async event => {
  const color = event.body.trim();
  console.log('updating color:', color);

  const ioPayload = {
    value:color
  };

  const response = await ioClient.post('/data',ioPayload);

  console.log({axiosResponse:response});

  return {
    statusCode: 200,
    body: response.data.value
  };
}
