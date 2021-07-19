import { method } from 'bluebird';
import { SiteClient } from 'datocms-client';

export default async function requestReceiver(request, response) {
    
    if (request.method === 'POST') {
        const TOKEN = 'cb5e2d88b7f0a998b8195b29df7608'
        const client = new SiteClient(TOKEN);

        const register = await client.items.create({
            itemType: "980342",
            ...request.body,
        })

        response.json({
            data: 'asdf',
            register: register
        })
        return;
    }
    
}