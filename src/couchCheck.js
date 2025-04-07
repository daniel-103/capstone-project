const fullURL = localStorage.getItem('CouchDBURL');
if (fullURL) {
    url = new URL(fullURL)
    window.top.db.linkCouch({
        hash: url.hash,
        host: url.host,
        hostname: url.hostname,
        href: url.href,
        origin: url.origin,
        password: url.password,
        pathname: url.pathname,
        port: url.port,
        protocol: url.protocol,
        search: url.search,
        username: url.username
    })
        .then(res => {
            if (res.error) {
                window.top.notify('error', `${res.message}`);
                return;
            }
            // window.top.notify('info', `${res.message}`, 8);
            if (window.top.DEBUG) console.log(res.message);
        })
}

const synced = localStorage.getItem('synced') == 'true'
if (synced) {
    window.top.db.sync()
        .then(res => {
            if (res.error) {
                window.top.notify('error', `${res.message}`);
                return;
            }
            // window.top.notify('info', `${res.message}`, 8);
            if (window.top.DEBUG) console.log(res.message);
        })
}


