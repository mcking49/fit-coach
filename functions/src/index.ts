import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.createClientAccount = functions.firestore
  .document('userProfile/{userId}/clientList/{clientId}')
  .onCreate(async (snapshot, context) => {
    const userCredential = {
      email: snapshot.data()!.email,
      displayName: snapshot.data()!.fullname,
      uid: context.params.clientId,
      password: '121212'
    };

    try {
      const userRecord: admin.auth.UserRecord = await admin.auth().createUser(userCredential);
      console.log('... userRecord created');
      const user = {
        fullname: userRecord.displayName,
        id: userRecord.uid,
        email: userRecord.email,
        coachId: context.params.userId,
        admin: false,
        startingWeight: snapshot.data()!.startingWeight
      }
      console.log('... creating user profile');
      return admin.firestore().doc(`userProfile/${user.id}`).set(user);
    } catch (error) {
      console.error('--- ERROR: Failed to create a user: ', error);
      return error;
    }
  });

exports.addWeightTrack = functions.firestore
  .document('userProfile/{userId}/weightTrack/{weightId}')
  .onCreate(async (snapshot, context) => {
    const userId = context.params.userId;
    const weightTrack = snapshot.data();
    try {
      const userSnapshot: FirebaseFirestore.DocumentSnapshot = await admin.firestore().doc(`userProfile/${userId}`).get()
      const coachId = userSnapshot.data()!.coachId;

      return admin
        .firestore()
        .doc(`userProfile/${coachId}/clientList/${userId}/weightTrack/${weightTrack!.id}`)
        .set(weightTrack!);
    } catch (error) {
      console.error('--- ERROR: failed to add a new weight track: ', error);
      return error;
    }
  });