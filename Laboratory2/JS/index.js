let long;
let lat;


let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector(".location-timezone");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/'

        const api = `${proxy}https://api.darksky.net/forecast/4bd10d009a22d06fa53035a990e8ea2d/${lat},${long}`;

        fetch(api)
            .then(res => {
                try {
                    return res.json();    
                } catch (error) {
                    console.log(Error)
                }
            })
            .then(data => {
                console.log(data);

                const { temperature, summary, icon } = data.currently;

                temperatureDegree.textContent = ((temperature - 32) / 1.8).toFixed(1);

                temperatureDescription.textContent = summary;

                locationTimezone.textContent = data.timezone;

                setIcon(icon, document.querySelector('.icon'));
            })
    });
} else {
    h1.textContent = "It's doesn't work!";
}
function setIcon (icon, iconId) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
}

function initMap() {
    map = new google.maps.Map(document.querySelector('#map'), {
      center: {lat: lat, lng: long},
      zoom: 8
    });
    
    marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        map: map,
        title: `Yes`
    });
}


