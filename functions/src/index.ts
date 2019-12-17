const fbAdmin = require('firebase-admin');

fbAdmin.initializeApp({crendential: fbAdmin.crendential.cert(require('./adminSDK-key.json'))});
