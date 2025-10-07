// The API base url
const API_URL = 'https://script.google.com/macros/s/AKfycbzFjWZiI75cG2ive_afK1AyDoxgqWxAq3PX-SPxH49voeCrw446kNHMqTmsoSQrgAb2iw/exec';


async function postData(name, address, amount) {
    // Get or prompt for api key
    apiKey = getAPIKey()

    // Post request parameters
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('address', address);
    params.append('amount', amount);
    params.append('api_key', apiKey);

    try {
        // Do request
        const res = await fetch(API_URL, {
            method: 'POST',
            body: params
        });
        // Get data from request
        const data = await res.json();

        if (res.ok && data.status != "error") {
            return data.row_numbers
        } else {
            return data.message;
        }

    } catch (error) {
        return error.message;
    }
}