bold=$(tput bold)
normal=$(tput sgr0)

echo ${bold}Create Scratch Org$1${normal}
echo sfdx force:org:create -f config/project-scratch-def.json --setalias $1 --setdefaultusername --durationdays $2 --targetdevhubusername devhubldo
sfdx force:org:create -f config/project-scratch-def.json --setalias $1 --setdefaultusername --durationdays $2 --targetdevhubusername devhubldo
sleep 5
echo -e

echo ${bold}Push Package${normal}
echo sfdx force:source:push --forceoverwrite --loglevel fatal --wait 30
sfdx force:source:push --forceoverwrite --loglevel fatal --wait 30
echo -e

echo ${bold}Open Scratch Org: $1${normal}
echo sfdx force:org:open
sfdx force:org:open
