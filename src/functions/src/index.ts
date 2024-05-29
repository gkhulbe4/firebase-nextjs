import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if it hasn't been initialized already
if (!admin.apps.length) {
  admin.initializeApp();
}

const grantModeratorRole = async (email:string) => {
  const user = await admin.auth().getUserByEmail(email);
  if (user) {
    await admin.auth().setCustomUserClaims(user.uid, { moderator: true });
    return `Success! ${email} has been granted moderator role.`;
  } else {
    throw new Error(`User with email ${email} not found.`);
  }
};

export const addAdmin = functions.https.onCall(async (data:string, context:any) => {
  if (context.auth.token.moderator !== true) {
    return {
      error: "Request not authorized. User must be a moderator to fulfill request."
    };
  }

  const email = data.email;

  try {
    const result = await grantModeratorRole(email);
    return { result };
  } catch (error:any) {
    return { error: error.message };
  }
});
