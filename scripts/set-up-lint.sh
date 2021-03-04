#!/bin/bash

if [ -z "$1" ]; then
	echo "Root package is undefined!"
	exit 1
fi

if [ -z "$2" ]; then
	echo "Package is undefined!"
	exit 1
fi

rootPath=$1
packagePath=$2

scriptPath="${rootPath}/scripts"

cd "${packagePath}" || exit

echo "🚀️ Set up lint"

# lint 설정
node "${scriptPath}/extend-eslint.js" "${rootPath}" "${packagePath}"
cp "${rootPath}/.eslintignore" "${packagePath}/.eslintignore"

echo "🎉 Finish to set up lint"
