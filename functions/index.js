const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
exports.postcomments = functions.https.onRequest((request, response) => {
// 1. Receive comment data in here from user POST request
// 2. Connect to our Firestore database
admin.firestore().collection('comments').add(request.body);
response.send("Saved in the database");
});
exports.getcomments = functions.https.onRequest((request, response) => {
// 1. Connect to our Firestore database
let myData = []
admin.firestore().collection('comments').orderBy('timestamp').get().then((snapshot) => {
if (snapshot.empty) {
console.log('No matching documents.');
response.send('No data in database');
return;
}
snapshot.forEach(doc => {
myData.push(doc.data());
});
// 2. Send data back to client
response.send(myData);
})
});
exports.postcomment = functions.https.onRequest((request, response) => {
    console.log("Request body", request.body);
    // Create a timestamp to add to the comment document
    const currentTime = admin.firestore.Timestamp.now();
    request.body.timestamp = currentTime;
    admin.firestore().collection('comments').add(request.body).then(()=>{
    response.send("Saved in the database! And we commited a change!");
    });
    });