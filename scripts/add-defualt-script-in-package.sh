#!/bin/bash

if [ -z "$1" ]; then
	echo "Source package is undefined!"
	exit 1
fi

if [ -z "$2" ]; then
	echo "Target package is undefined!"
	exit 1
fi

if [ -z "$3" ]; then
	echo "Script path is undefined!"
	exit 1
fi


sourcePath=$1
targetPath=$2
scriptPath=$3

cd "${targetPath}" || exit

echo "🚀️ Set up default script in package"

node "${scriptPath}/copy-package-element.js" "${sourcePath}/package.json" "${targetPath}/package.json" "main"
node "${scriptPath}/copy-package-element.js" "${sourcePath}/package.json" "${targetPath}/package.json" "build"
node "${scriptPath}/copy-package-element.js" "${sourcePath}/package.json" "${targetPath}/package.json" "clean"
node "${scriptPath}/copy-package-element.js" "${sourcePath}/package.json" "${targetPath}/package.json" "compile"
node "${scriptPath}/copy-package-element.js" "${sourcePath}/package.json" "${targetPath}/package.json" "prepublishOnly"
node "${scriptPath}/copy-package-element.js" "${sourcePath}/package.json" "${targetPath}/package.json" "test"

echo "🎉 Finish to set up default script in package"
