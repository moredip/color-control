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

    if( event.httpMethod !== 'PUT' ){
        return {
            statusCode: 405
        };
    }

    const color = event.body.trim();
    console.log('updating color:', color);

    const ioPayload = {
        value:color
    };

    const response = await ioClient.post('/data',ioPayload);

    console.log({axiosResponse:response});

    return {
        statusCode: 200,
        body: JSON.stringify({
            color
        })
    };
}