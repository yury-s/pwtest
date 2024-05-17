import fs from 'fs';

const inputString = fs.readFileSync('actions.json', 'utf8');
const events = JSON.parse(inputString);
events.forEach(event => event.context = undefined);

const sort1 = events.sort((a, b) => a.startTime - b.startTime);
fs.writeFileSync('sort-startTime.txt',  sort1.map(JSON.stringify).join('\n'));

const sort2 = events.sort((a, b) => a.wallTime - b.wallTime);
fs.writeFileSync('sort-wallTime.txt',  sort2.map(JSON.stringify).join('\n'));

