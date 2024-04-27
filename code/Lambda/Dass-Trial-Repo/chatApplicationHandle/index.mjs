import faker from "faker";

export const handler = async (event) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.routeKey) {
            case "GET /api/random":
                body = JSON.stringify({
                    response: faker.lorem.sentence()
                });
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    }
    catch (err) {
        statusCode = 400;
        body = err.message;
    }
    finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
}