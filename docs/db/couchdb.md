# CouchDB
CouchDB is the remote counterpart to PouchDB. It is a remote database that can sync with the local PouchDB databsae. To do this, the user must must create and host their own CouchDB instance.

## Creating your CouchDB instance
This is a quick guide for setting up a barebones instance of CouchDB for Skriptor to sync with. If you'd rather read the official documentation, look [here](https://docs.couchdb.org/en/stable/intro/index.html)

### Install
Download CouchDB from [here](https://couchdb.apache.org/#download) and install it. In the installation, you will be asked to provide a username and password for admin access and a cookie (which can be randomely generated). If you checked the option to install it as a service, it will automatically start when the system is on. 

### Setup
Once CouchDB is running, you can access it by going to http://127.0.0.1:5984. If you've done everything correctly, CouchDB should respond with
```js 
{
    "couchdb": "Welcome",
    "version": "3.4.3",
    "git_sha": "83bdcf693",
    "uuid": "56f16e7c93ff4a2dc20eb6acc7000b71",
    "features": [
        "access-ready",
        "partitioned",
        "pluggable-storage-engines",
        "reshard",
        "scheduler"
    ],
    "vendor": {
        "name": "The Apache Software Foundation"
    }
}
```

You can access an interactive gui in your web browser by going to http://127.0.0.1:5984/_utils. From there, login with the admin credentials you submitted upon instalation, then navigate to the 'Databases' tab. In the top right, 'Create Database', give it a suitable name, leave it as 'Non-partitioned', and create the new database.

This is the bare minimum needed to sync with a local installation of CouchDB. To connect to a local installation of CouchDB with Skriptor, in Skriptor, go to settings and enter the information in the fields. It will construct a full URL from the pieces of information given. Similarly, it will parse a given full URL into its components. Either input method works, but be sure that the full URL is correct (as outlined in green) since it is the URL that is actually used. 

Valid URLs are of this format:
http://`username`:`password`@`hostname`:`port`/`dbname`
- `username`: The username of an admin account.
- `password`: The password of the admin account.
- `hostname`: The name of the host serving the CouchDB instance. (in this case, it would be `127.0.0.1` or `localhost`)
- `port`: The port that the CouchDB instance is listening on. By default it is `5984`.
- `dbname`: The name that was given to the created database within CouchDB.

Like any service, CouchDB can be exposed to the internet and accessed from anywhere by forwarding its port in your router. Because there are many different types of routers and each has their own way of doing this, how to port forward will not be discused in further detail here. However, resources to do this are readily accesible on the internet.