#!/bin/bash

cd $PWD

git diff --stat $1 $2 -- "src" ":(exclude)src/assets" | tail -n 1