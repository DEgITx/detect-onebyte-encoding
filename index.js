const fs = require('fs')

let encodingMap = {}

function padWithZeroes(number, length) {
    let my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
}

function convertToHex(str) {
    let hex = '';
    for(let i=0; i<str.length; i++) {
        hex += str.charCodeAt(i).toString(16).toUpperCase();
    }
    return hex;
}

function readEncondng(fileName)
{
	const encondingFile = fs.readFileSync(fileName, 'utf8');
	const reg = /(0x[0-9A-F]+)\s+(0x[0-9A-F]+)/g
	let mp
	while(mp = reg.exec(encondingFile))
	{
		const enc = (fileName.split('/').slice(-1)[0].split('.')[0]).toLowerCase()
		if(!encodingMap[mp[2]])
			encodingMap[mp[2]] = {symbol: mp[1], encoding: [enc]}
		else
			encodingMap[mp[2]].encoding.push(enc)
	}
}

function detectEncoding(str)
{
	if(str.length == 0)
		return 'utf8'

	const results = {}

	for(let i = 0; i < str.length; i++)
	{
		const search = `0x${padWithZeroes(convertToHex(str[i]), 4)}`
		const result = encodingMap[search]
		if(result)
		{
			for(const encoding of result.encoding)
			{
				if(!results[encoding])
				{
					results[encoding] = 0
				}
				results[encoding]++
			}
		}
	}
	let max = 0;
	let resultEncoding = 'utf8'
	for(let enc in results)
	{
		if(results[enc] > max)
		{
			resultEncoding = enc
			max = results[enc]
		}
	}

	if(max != str.length) {
		return 'utf8'
	}

	return resultEncoding
}

readEncondng(__dirname + '/CP874.TXT')
readEncondng(__dirname + '/CP1250.TXT')
readEncondng(__dirname + '/CP1251.TXT')
readEncondng(__dirname + '/CP1252.TXT')
readEncondng(__dirname + '/CP1253.TXT')
readEncondng(__dirname + '/CP1254.TXT')
readEncondng(__dirname + '/CP1255.TXT')
readEncondng(__dirname + '/CP1256.TXT')
readEncondng(__dirname + '/CP1257.TXT')
readEncondng(__dirname + '/CP1258.TXT')

module.exports = detectEncoding
