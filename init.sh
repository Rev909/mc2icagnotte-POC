#!/bin/bash


echo "=====Script d'initialisation====="


buildir="$(pwd)/build"
echo "Dossier à effacer :" $buildir

rm -rf $buildir
truffle compile
truffle migrate

exit