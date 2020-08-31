#!/bin/bash

if [ -z "$1" ]; then
	echo "Package location is undefined!"
	exit 1
fi

if [ -z "$2" ]; then
	echo "Package name is undefined!"
	exit 1
fi

packageLocation=$1
packageName=$2

rootPath=$(pwd)
scriptPath="${rootPath}/scripts"
templatePath="${rootPath}/templates"

echo "🚀 Start to creat new package ${packageName} in ${packageLocation}..."

# 패키지 생성
echo "⚙️ Init ${packageName}"

npm run create "${packageName}" "${packageLocation}"

echo "✅ Finish"

# 패키지 위치 저장
cd "${packageLocation}/${packageName}" || exit
packagePath=$(pwd)

cd "${rootPath}" || exit

# Typescript 세팅
sh "${scriptPath}/set-up-typescript.sh" "${rootPath}" "${packagePath}"

# package.json 수정
sh "${scriptPath}/add-default-script-in-package" "${templatePath}/default" "${packagePath}" "${scriptPath}"

# npm ignore
echo "⚙️ copy npm ignore"

cp "${rootPath}"/.npmignore "${packagePath}"

echo "✅ Finish"

# git
echo "⚙️ copy git ignore"

cp "${rootPath}"/.gitignore "${packagePath}"
git add .

echo "✅ Finish"

echo "🎉 Finish to install ${packageName} in ${packageLocation}"
