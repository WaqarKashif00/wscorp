const { initializeApp } = require('firebase/app');
const { initializeFirestore, collection, addDoc, getDocs, deleteDoc, doc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: 'AIzaSyB9ApCyE1D2ZQhQ53ZFs5LvrK-lNZm6feI',
    authDomain: 'wv-services-corp.firebaseapp.com',
    projectId: 'wv-services-corp',
    storageBucket: 'wv-services-corp.firebasestorage.app'
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

async function testConnection() {
    try {
        console.log('--- Phase 1: Test Write ---');
        const testDoc = {
            title: 'Diagnostic Test ' + new Date().toISOString(),
            status: 'published',
            createdAt: Timestamp.now()
        };
        const docRef = await addDoc(collection(db, 'projects'), testDoc);
        console.log('✅ WRITE SUCCESS! Created project ID:', docRef.id);

        console.log('\n--- Phase 2: Test Read ---');
        const snap = await getDocs(collection(db, 'projects'));
        console.log('✅ READ SUCCESS! Found ' + snap.size + ' projects total.');

        console.log('\n--- Phase 3: Cleanup ---');
        await deleteDoc(doc(db, 'projects', docRef.id));
        console.log('✅ CLEANUP SUCCESS! Deleted test project.');

        console.log('\nCONCLUSION: Your Firebase project is connected and working perfectly with Long Polling.');

    } catch (e) {
        console.error('❌ CONNECTION FAILED!');
        console.error('Error Code:', e.code);
        console.error('Error Message:', e.message);
    }
    process.exit(0);
}

testConnection();
