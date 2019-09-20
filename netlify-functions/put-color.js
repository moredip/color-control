exports.handler = async event => {
    console.log({event});

    if( event.httpMethod !== 'PUT' ){
        return {
            statusCode: 405
        };
    }

    const color = event.body;
    console.log('updating color:', color);

    return {
        statusCode: 200,
        body: JSON.stringify({
            color
        })
    };
}