# PouchDB

PouchDB is the database we decided to use for our application. We considered multiple databases with the following metrics:
1. Should have the ability to be used locally.
2. Should have the ability to optionally sync with a remote database (cloud)
3. Should not require an account for local use.

We narrowed down our options to PouchDB/CouchDB and Firebase. We opted to go with PouchDB for our local database (and optional CouchDB for the remote database) because we did not want to burden the user with a login that is required by Firebase. Although Firebase is easier to sync with, PouchDB is more streamlined for the out-of-box user experience in that no configuration is needed.

(Here down has not yet been implemented)

For remote syncing, PouchDB needs to connect to CouchDB. While PouchDB is a node package that can be included in our application, CouchDB is a service that resides on the system. It can be on either the same system as the application, or on a different, remote database. 

All that is needed to do this is to install CouchDB on a system, forward its port on your network, and connect to your network with that open port number. This is standard server hosting if you are familiar with basic networking.