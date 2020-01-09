const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');


//Initialize express
const app = express();

// Initialize Cloud Firestore 
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();




//Functions

/* if we want to work with independent fucntions*/

/*
exports.geScreams = functions.https.onRequest((request, response) => {
    db.collection('screams').get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push(doc.data());;
            });
            return response.json(screams);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });

});

exports.createScream = functions.https.onRequest((request, response) => {

    if(request.method !== 'POST'){
        return response.status(400).json({error: 'Method not allowed'});
    }
    const newScream = {
        body: request.body.body,
        userHandle: request.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    }

    db.collection('screams').add(newScream)
        .then(doc => {
            response.json({ message: `document ${doc.id} created successfully` });
        })
        .catch(err => {
            response.status(500).json({ error: `something went wrong. ${err}` });
            console.error(err);
        });
});

*/


/* Working with express*/


app.get('/screams', (request, response) => {
    db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
        let screams = [];
        data.forEach((doc) => {
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });;
        });
        return response.json(screams);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
})


app.post('/screams',(request, response) => {

    const newScream = {
        body: request.body.body,
        userHandle: request.body.userHandle,
        createdAt: new Date().toISOString() // firebase timestamp ...admin.firestore.Timestamp.fromDate(new Date())
    }

    db.collection('screams').add(newScream)
        .then(doc => {
            response.json({ message: `document ${doc.id} created successfully` });
        })
        .catch(err => {
            response.status(500).json({ error: `something went wrong. ${err}` });
            console.error(err);
        });
});


exports.api = functions.https.onRequest(app);