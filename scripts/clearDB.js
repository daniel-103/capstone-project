const fs = require('fs');
const path = require('path');

const userDataPath = path.join(process.env.APPDATA, 'capstone-project/Scriptor');

fs.rm(userDataPath, { recursive: true, force: true }, (err) => {
    if (err) {
        console.error(`Error deleting pragram data: ${err}`);
    } else {
        console.log(`Successfully deleted program data at: ${userDataPath}`);
    }
});
