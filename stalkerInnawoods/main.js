/*
 *This is one of the first times I programmed something to do something because society
 *told me that I gotta "learn to code". If it looks bad, you know why.
 */

/*There are two separate json files with all the contents already listed and made
 *1. innawoods.net/img/contents.json
 *2. innawoods.net/InnawoodsBar/contents.json
 */
console.log('script loaded indicator');

function imgListArray(obj) {
	let itemCnt = obj.items.length;
	const tempList = [];
	for (let i = 0; i < itemCnt; i++) {
		if (obj.items[i].name === ''){
			tempList.push(obj.items[i].modelName);
		} else {
			tempList.push(obj.items[i].name);
		}
	}
	return tempList;
}

function unCharRm(xString, badChar) {
	strSplit = xString.split('');
	splitCnt = xString.length;
	let strArray = [];
	for (let i = 0; i < splitCnt; i++){
		if (strSplit[i] === badChar){
			continue;
		} else {
			strArray.push(strSplit[i]);
		}
	}
	neoString = strArray.join('');
	return neoString;
}

function arrayRm(arrayList, charRm) {
	arrayCnt = arrayList.length;
	let neoArray = [];
	badChar = charRm
	for (let i = 0; i < arrayCnt; i++){
		let neoString = unCharRm(arrayList[i], badChar);
		neoArray.push(neoString);
	}
	return neoArray;
}

function arrayLower(arrayList) {
	arrayCnt = arrayList.length;
	let neoArray = [];
	for (let i = 0; i < arrayCnt; i++){
		neoString = arrayList[i].toLowerCase();
		neoArray.push(neoString);
	}
	return neoArray;
}

function processArray(rawArrayData) {
	let finalArray;
	finalArray = arrayRm(rawArrayData, ' ');
	finalArray = arrayRm(finalArray, '.');
	finalArray = arrayRm(finalArray, '/');
	finalArray = arrayRm(finalArray, '-');
	finalArray = arrayRm(finalArray, "\\");
	finalArray = arrayRm(finalArray, '"');
	finalArray = arrayLower(finalArray);
	return finalArray;
}

function yoinkImg(url) {
	let request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	let itemList;
	request.onload = function() {
		siteData = request.response;
		itemList = imgListArray(siteData);
		finalArray = processArray(itemList);
		if (url === imgURL){
			console.log(finalArray[622]);
		}
		console.log(finalArray);
	}
}

const imgURL = 'https://innawoods.net/img/contents.json';
const innawoodsBarURL = 'https://innawoods.net/InnawoodsBar/contents.json';

yoinkImg(innawoodsBarURL);
yoinkImg(imgURL);

/*
const btn = document.querySelector('button');
//console.log(btn);

btn.onclick = function() {
	console.log("this button has been pressed!!!");
}
*/





























