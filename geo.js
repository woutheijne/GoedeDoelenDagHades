var geolocationEnabled = true;

if (!("geolocation" in navigator)) {
    console.log("Geolocation not supported")
    geolocationEnabled = false;
}


function getCoords() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error("Geolocation not supported by this browser."));
        }

        // Call the standard Geolocation API
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                let message = "An unknown error occurred.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = "Permission denied by user.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        message = "Request timed out.";
                        break;
                }
                reject(new Error(message));
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    });
}

async function reverseGeocode(lat, lng) {
    // OpenStreetMap Nominatim API URL for reverse geocoding
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Reverse Geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();
    const address = data.address;
    console.log(address)

    let streetName = "";

    // Check common fields for street name in Nominatim response
    if (address.road) {
        streetName = address.road;
    } else if (address.street) {
        streetName = address.street;
    } else if (address.pedestrian) {
        streetName = address.pedestrian;
    } else if (data.display_name) {
        streetName = data.display_name.split(',')[0]; // Take the first component of the full address
    } 

    return streetName;
}

async function getStreetName() {
    if (!geolocationEnabled) {
        return;
    }
    const coords = await getCoords()
    console.log(coords)
    const streetName = await reverseGeocode(coords.lat, coords.lng)
    console.log(streetName)
}