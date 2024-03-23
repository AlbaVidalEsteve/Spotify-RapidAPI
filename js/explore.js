let apiKey = "8537f834a1msh7926f4bd74ed48dp1f5493jsnf550fe5133bf";

const url = 'https://spotify23.p.rapidapi.com/browse_all/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data));