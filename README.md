# Server for the Open Source for Good Directory

This repo contains the server code for the open-source-for-good-directory. The directory depends on a remote server to perform an automated webpage build for each project that requires it. (Not a Back-end server)

The server works in the following way:

1. A Github WebHook registers push events for all the freeCodeCamp repos. It sends a POST requests to a server hosted in Glitch.com (Specified on the WebHook configuration)
1. If there is an update to the configuration file `.osfg-dir-config.js`, it downloads the file and builds an HTML file.
1. The file is pushed to the **[osfg-open-source-for-good-directory](https://github.com/freecodecamp/open-source-for-good-directory)** inside the `docs` folder.
1. Everything inside the `docs` folder is automatically deployed to GitHub Pages, which in turn are linked to the directory's website.

### License

This computer software is licensed under the open source BSD-3-Clause.

Copyright (c) 2017, [freeCodeCamp](https://www.freecodecamp.org).
