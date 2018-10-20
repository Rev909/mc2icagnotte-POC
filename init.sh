#!/bin/bash


echo "=====Script d'initialisation====="

workdir="$(pwd)"

echo "Dossier actuel :" $workdir

read -p "Le script requiert l'ouverture de Ganache, l'avez-vous bien ouvert [O/n] ? : " answer

if [ -d "$workdir/build" ]; then
  echo "Le dossier build existe, suppression..."
  rm -rf $workdir/build
  echo "Suppression effectuée"
fi

if [ "$answer" = "O" -o "$answer" = "o" ]
then
  truffle compile
  truffle migrate
else
  echo "Vous devez ouvrir Ganache avant de déclencher le script"
fi

exit
