import * as functions from 'firebase-functions';
import * as https from 'https';

export const getGeoLocation = functions.https.onRequest((request, response) => {

    const query = {
        location: request.query.location
    }

    const googleApiKey = "AIzaSyDOKSVsF1lEULUoYU3Wzfo-xiuqD_3cdAA"

    https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query.location}&key=${googleApiKey}`, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            response.send(body);
        });
    }).on('error', (e) => {
        console.error(e);
    });



});