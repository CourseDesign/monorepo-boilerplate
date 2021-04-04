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

templatePath="${rootPath}/templates/default"

cd "${packagePath}" || exit

echo "🚀️ Set up gulp"

# gulpfile 복사
echo "⚙️ Copy gulpfile"

ln -s "${templatePath}/gulpfile.js" "${packagePath}"

echo "✅ Finish"

echo "🎉 Finish to set up gulp"
