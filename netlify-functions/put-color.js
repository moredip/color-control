exports.handler = async event => {
    console.dir({event});
    
    const color = event.body.color;
    console.log('updating color:', color);

    return {
        statusCode: 200,
        body: {
            color: 'rebeccapurple'
        }
    };
}