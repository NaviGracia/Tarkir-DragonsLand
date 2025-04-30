const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User not signed in.");
  }

  const userId = context.auth.uid;
  const cartRef = admin.firestore().collection("carts").doc(userId);
  const cartSnap = await cartRef.get();

  if (!cartSnap.exists) {
    throw new functions.https.HttpsError("not-found", "Cart not found");
  }

  const cartData = cartSnap.data();
  const items = cartData.items;
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const orderRef = admin.firestore().collection("orders").doc();
  await orderRef.set({
    userId,
    items,
    total,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // optional: clear cart
  await cartRef.delete();

  return { success: true, orderId: orderRef.id };
});
