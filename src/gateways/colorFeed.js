import tinycolor from 'tinycolor2'
import axios from 'axios';

export default function createColorFeedGateway(){
    const client = axios.create({
        baseURL: '/.netlify/functions'
    });

    async function putColor(color){
        const body = color.toHexString();
        const response = await client.put( "/color", body );
        const colorFromServer = tinycolor(response.data.color);
        return colorFromServer;
    }

    return {
        putColor
    };
}