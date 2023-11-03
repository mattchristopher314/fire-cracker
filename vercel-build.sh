#!/bin/bash
 
if [[ $VERCEL_GIT_COMMIT_REF == "main"  ]] ; then 
  echo "Building in production environment"
  npm run build:prod
else 
  echo "Building in development environment"
  npm run build:dev
fi
