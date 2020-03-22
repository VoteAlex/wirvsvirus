import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

export const incrementJobCounter = functions.firestore
  .document('jobs/{jobId}')
  .onCreate(
      (change, context) => {
        db.doc('/counters/lLcm2I58RLbRU7nOKc4h').update({"jobs": admin.firestore.FieldValue.increment(1)})
        return 0;
      }
    );

export const decrementJobCounter = functions.firestore
    .document('jobs/{jobId}')
    .onDelete(
        (change, context) => {
          db.doc('/counters/lLcm2I58RLbRU7nOKc4h').update({"jobs": admin.firestore.FieldValue.increment(-1)})
          return 0;
        }
    );