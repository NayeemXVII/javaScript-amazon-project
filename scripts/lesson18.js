const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

fetch('https://supersimplebackend.dev/greeting').then((response) => {
    return response.text();
}).then((textResponse) => {
    console.log(textResponse);
});

async function getTextBackendAsync() {
    const response = await fetch('https://supersimplebackend.dev/greeting');

    const textResponse = await response.text();
    
    
    console.log(textResponse);
}

getTextBackendAsync();

async function postObjectBackend() {
    const responseInfo = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'MD. Zannatun Nayeem'
        })
    });

    const jsonResponse = await responseInfo.text();

    console.log(jsonResponse);
};

postObjectBackend();

async function getAmazonBackend() {
    try {
        const responseInfo = await fetch('https://amazon.com');

        const response = await responseInfo.text();

        console.log(response);
    } catch (error) {
        console.log('CORS error. Your request was blocked by the backend');
    }
};

getAmazonBackend();

