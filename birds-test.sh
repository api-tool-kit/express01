#!/bin/bash

# run tests
newman run birds-collection.postman_collection.json -e mamund-local.postman_environment.json

# EOF
