#!/bin/bash

# generic newman/postman collection cli test runner
# collection = postman_collection.json file
# env = postmand_environment.json file
# output = file to pipe the output into

# set vars
collection=birds-collection.postman_collection.json
env=mamund-local.postman_environment.json
output=birds-tests.txt

#banner
echo .
echo NEWMAN TEST RUNNER
echo running tests using:
echo -- collection: $collection 
echo -- environment: $env
echo -- output: $output
echo .

# clean up environment
if [ -e $output ]
then
  rm $output
fi

# run tests
newman run $collection -e $env > $output

if [ $? -gt 0 ]
then
  echo One or more tests failed. See $output for details.
else
  echo All tests passed.  
fi 

# EOF
