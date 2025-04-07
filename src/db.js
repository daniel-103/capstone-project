const PouchDB = require('pouchdb');
PouchDB.plugin(require("pouchdb-find"));

let pouchDB;
let couchDB;
let dbPath;

let syncHandler;

async function initPouchDB(path) {
    try {
        dbPath = path;
        console.log(`Database path: ${path}`);
        pouchDB = new PouchDB(path);
        return { message: 'Initialized local database' };
    } catch (error) {
        // SHIT IS VERY FUCKED
        console.log(error);
        return { error: true, message: 'Could not create local database' };
    }
}

async function clearPouch() {
    try {
        await pouchDB.destroy();
        await initPouchDB(dbPath);
        return { message: 'Cleared local project data' };
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not clear local project data' };
    }
}

async function clearCouch() {
    try {
        if (!couchDB) return { error: true, message: 'No remote database connected' }

        const allDocs = await couchDB.allDocs({ include_docs: false })

        const purgeMap  = {};
        for (const row of allDocs.rows) {
            purgeMap [row.id] = [row.value.rev];
        }

        const response = await fetch(`${couchDB.url.origin}${couchDB.url.pathname}/_purge`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + btoa(`${couchDB.url.username}:${couchDB.url.password}`),
            },
            body: JSON.stringify(purgeMap)
        });

        console.log(response)

        return { message: 'Cleared remote project data' };
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not clear remote project data' };
    }
}

async function deleteCouch() {
    try {
        if (!couchDB) return { error: true, message: 'No remote database connected' }
        await couchDB.destroy();
        couchDB = undefined;
        return { message: 'Deleted the remote database' };
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not delete the remote database' };
    }
}

async function linkCouch(url) {
    try {
        couchDB = new PouchDB(url.href);
        couchDB.url = url
        return { message: `Connected to remote database "${url.pathname.replace("/", "")}" at ${url.hostname}` };
    } catch (error) {
        console.log(error);
        return { error: true, message: `Could not connect to remote database at ${url.hostname}` };
    }
}

async function unlinkCouch() {
    try {
        couchDB = undefined;
        return { message: "Disconnected from remote database" };
    } catch (error) {
        console.log(error);
        return { error: true, message: "Could not disconnect from remote database" };
    }
}

async function merge() {
    try {
        await pouchDB.sync(couchDB)
        return { message: 'Merged local and remote project data' };
    } catch (error) {
        console.log(error)
        return { error: true, message: "Could not merge" };
    }
}

async function mergeToPouch() {
    try {        
        if (!couchDB) return { error: true, message: 'No remote database connected' }

        await pouchDB.replicate.from(couchDB);
        return { message: "Succesfully merged remote project data into local local project data" };
    } catch (error) {
        return { error: true, message: "Could not merge remote project data into local local project data" };
    }
}

async function mergeToCouch() {
    try {
        if (!couchDB) return { error: true, message: 'No remote database connected' }

        await pouchDB.replicate.to(couchDB);
        return { message: "Succesfully merged local project data into remote project data" };
    } catch (error) {
        return { error: true, message: "Could not merge local project data into remote project data" };
    }
}

async function replicateToPouch() {
    try {
        if (!couchDB) return { error: true, message: 'No remote database connected' };

        await clearPouch();
        await pouchDB.replicate.from(couchDB);
        return { message: "Succesfully overwrote local project data data with remote project data" };
    } catch (error) {
        return { error: true, message: "Could not overwrite local project data with remote project data" };
    }
}

async function replicateToCouch() {
    try {
        if (!couchDB) return { error: true, message: 'No remote database connected' };

        await clearCouch();
        await pouchDB.replicate.to(couchDB);
        return { message: "Succesfully overwrote remote project data with local project data" };
    } catch (error) {
        return { error: true, message: "Could not overwrite remote project data with local project data" };
    }
}

async function sync() {
    try {
        if (!couchDB) return { error: true, message: 'No remote database connected' }

        syncHandler = pouchDB.sync(couchDB, { live: true, retry: true })
            // .on('change', info => console.log('Sync change:', info))
            // .on('paused', err => console.log('Sync paused:', err))
            // .on('active', () => console.log('Sync active'))
            // .on('denied', err => console.log('Sync denied:', err))
            // .on('complete', info => console.log('Sync complete:', info))
            // .on('error', error => console.log('Sync error:', error));
        return { message: 'The remote database is now synced' };
    } catch (error) {
        return { error: true, message: "Could not sync with remote database" };
    }
}

async function unsync() {
    try {
        syncHandler.cancel();
        return { message: 'The remote database is no longer synced' };
    } catch (error) {
        return { error: true, message: "Could not unsync from the remote database" };
    }
}



async function put(doc) {
    try {
        return await pouchDB.put(doc);
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not write to database' };
    }
}

async function post(doc) {
    try {
        return await pouchDB.post(doc);
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not write to database' };
    }
}

async function update(id, updates) {
    try {
        const doc = await pouchDB.get(id);
        const updatedDoc = { ...doc, ...updates }; // Merge existing fields
        return await pouchDB.put(updatedDoc);
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not update doc' };
    }
}

async function get(id) {
    try {
        return await pouchDB.get(id);
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not read from database' };
    }
}

async function getAll() {
    try {
        const result = await pouchDB.allDocs({ include_docs: true });
        return result.rows.map(row => row.doc);
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not read from database' };
    }
}

async function remove(id) {
    const doc = await pouchDB.get(id);
    return await pouchDB.remove(doc);
}

async function find(query) {
    try {
        const doc = await pouchDB.find(query);
        return doc.docs;
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not find query' };
    }
}

async function createIndex(indexDef) {
    try {
        return await pouchDB.createIndex(indexDef);
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not create index' };
    }
}

async function allDocs(options) {
    try {
        return await pouchDB.allDocs(options);
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not get all docs' };
    }
}

async function getIndexes() {
    try {
        return await pouchDB.getIndexes();
    } catch (error) {
        console.log(error);
        return { error: true, message: 'Could not get indexes' };
    }
}

module.exports = {
    merge,
    initPouchDB,
    clearPouch,
    clearCouch,
    deleteCouch,
    linkCouch,
    unlinkCouch,
    mergeToPouch,
    mergeToCouch,
    replicateToCouch,
    replicateToPouch,
    sync,
    unsync,
    put,
    post,
    update,
    get,
    getAll,
    remove,
    find,
    createIndex,
    allDocs,
    getIndexes
}