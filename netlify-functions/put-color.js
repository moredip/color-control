exports.handler = async event => {
    console.log({event});

    const color = event.body.color;
    console.log('updating color:', color);

    return {
        statusCode: 200,
        body: JSON.stringify({
            color: 'rebeccapurple'
        })
    };
}