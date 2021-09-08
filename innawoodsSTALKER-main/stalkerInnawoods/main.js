/*
 *This is one of the first times I programmed something to do something because society
 *told me that I gotta "learn to code". If it looks bad, you know why.
 */

/*There are two separate json files with all the contents already listed and made
 *1. innawoods.net/img/contents.json
 *2. innawoods.net/InnawoodsBar/contents.json
 */
console.log('SCRIPT LOAD INDICATOR');
//
//function imgListArray(obj) {
//	let itemCnt = obj.items.length;
//	const tempList = [];
//	for (let i = 0; i < itemCnt; i++) {
//		if (obj.items[i].name === ''){
//			tempList.push(obj.items[i].modelName);
//		} else {
//			tempList.push(obj.items[i].name);
//		}
//	}
//	return tempList;
//}
//
//function unCharRm(xString, badChar) {
//	strSplit = xString.split('');
//	splitCnt = xString.length;
//	let strArray = [];
//	for (let i = 0; i < splitCnt; i++){
//		if (strSplit[i] === badChar){
//			continue;
//		} else {
//			strArray.push(strSplit[i]);
//		}
//	}
//	neoString = strArray.join('');
//	return neoString;
//}
//
//function arrayRm(arrayList, charRm) {
//	arrayCnt = arrayList.length;
//	let neoArray = [];
//	badChar = charRm
//	for (let i = 0; i < arrayCnt; i++){
//		let neoString = unCharRm(arrayList[i], badChar);
//		neoArray.push(neoString);
//	}
//	return neoArray;
//}
//
//function arrayLowerCase(arrayList) {
//	arrayCnt = arrayList.length;
//	let neoArray = [];
//	for (let i = 0; i < arrayCnt; i++){
//		neoString = arrayList[i].toLowerCase();
//		neoArray.push(neoString);
//	}
//	return neoArray;
//}
//
//function processArray(rawArrayData) {
//	let finalArray;
//	finalArray = arrayRm(rawArrayData, ' ');
//	finalArray = arrayRm(finalArray, '.');
//	finalArray = arrayRm(finalArray, '/');
//	finalArray = arrayRm(finalArray, '-');
//	finalArray = arrayRm(finalArray, "\\");
//	finalArray = arrayRm(finalArray, '"');
//	finalArray = arrayLowerCase(finalArray);
//	return finalArray;
//}

// Every line of code above is litterally practice for URL and Array
// manipulation, so ignore. Lmao to all the losers who tried reading it

const IMG_URL = 'https://innawoods.net/img/contents.json';
const INNAWOODS_BAR_URL = 'https://innawoods.net/InnawoodsBar/contents.json';
const URL_ARRAYS = [IMG_URL, INNAWOODS_BAR_URL];

/* Objectives: create an array of all the items in the database
 * create a function to search for the items on the body
 * create a function to match the items on the body to the array in the database
 * generate a starting loadout file based on the matches
 * profit?
*/

function findCharacterLoadouts() {
	let primaryWeaponStyle = "\"cursor: pointer; width: 292px; height: 120px; top: 430px; left: 40px; position: absolute;\"";
	let primaryWeaponSlot = "div[style=" + primaryWeaponStyle + "] > div > img";
	let primaryWeapon = document.querySelector(primaryWeaponSlot);
	//console.log(primaryWeapon); //prints the primary weapon only, not the attachments

	let divFilter1 = "[style~='url(\"/INVENTORY_weaponmod.png\");']";
	let sortableDiv1 = "div" + divFilter1 + " > div > div > img";
	let allOtherSlots = document.querySelectorAll(sortableDiv1);
	//console.log(allOtherSlots); //prints all the other slots except the primary weapon
	//console.log(allOtherSlots[0].src); //This prints the first caught item's src (ie. the img)
	
	/* WARNING: the generated arrays contain duplicates.
	 *	After debugging, the duplicates come from opening
	 *  an XMLHTTPRequest, which I think the "querySelectorAll"
	 * 	function picks up residual data from the url. pops are
	 *  used to remove duplicates. A better fix may occur
	 * 	from using another promise, but I don't know how to
	 *  do that (yet).
	*/

	let tempArray1 = Array.from(allOtherSlots);
	let popCnt = (tempArray1.length / 2); //theres a duplicate for each item
	for (let i = 0; i < popCnt; i++) {tempArray1.pop();};
	if (primaryWeapon != null) {tempArray1.push(primaryWeapon);}
	let srcArray1 = tempArray1.map(i => i.src);

	let allItems = tempArray1; //all items the player selected
	let allItemsSrc = srcArray1; //all item's sources the player selected

	//console.log(allItems); //prints out the array
	//console.log(allItemsSrc); //prints out the src of the array
	return allItemsSrc;
}

function masterRequestOnload(url) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open('GET', url);
		//request.responseType = 'json';
		request.send();
		request.addEventListener('readystatechange', () => {
			if(request.readyState === 4 && request.status === 200){
				const data = JSON.parse(request.responseText);
				resolve(data);
			}	else if(request.readyState === 4){
				let err = ("Data from " + url + " has failed to acquire.");
				reject(err);
			}
		});
	})
};

function biggestBlackHoleOfCallbacks() {
	masterRequestOnload(IMG_URL).then((data) => {
		list1 = data.items;
		return masterRequestOnload(INNAWOODS_BAR_URL);
	}).then((data) => {
		list2 = data.items;
		totalItemArray = list1.concat(list2);
		//console.log(totalItemArray);
		return main(totalItemArray); //this is what is returned from the blackhole lol
	}).catch((err) => {
		console.log(err);
	})
}

function matchSelectedItems(totalItemArray, playerItemArray) {
	const totalItemArrayLength = totalItemArray.length;
	const playerItemArrayLength = playerItemArray.length;
	const matchedItems = [];
	const matchedObjects = [];
	const matchedObjectType = [];
	//console.log(totalItemArray);
	//console.log(playerItemArray);
	for (let i = 0; i < playerItemArrayLength; i++) {
		var playerItem = playerItemArray[i];
		for (let i = 0; i < totalItemArrayLength; i++) {
			if (totalItemArray[i].imgEncoded === playerItem) {
				//matchedItems.push(totalItemArray[i].name);
				matchedItems.push(namingHeirachy(totalItemArray[i]));
				matchedObjects.push(totalItemArray[i]);
				matchedObjectType.push(totalItemArray[i].type);
			} else { continue; }
		}
	}
	matchedItems.sort();
	matchedObjects.sort();
	matchedObjectType.sort();
	//console.log(matchedItems);
	//console.log(matchedObjects.type);
	//console.log(matchedObjectType);
	return matchedObjects;
}

function namingHeirachy(targetItem) {
	if (targetItem.name != "") {
		return targetItem.name;
	} else if (targetItem.modelName != "") {
		return targetItem.modelName;
	} else if (targetItem.subType != "") {
		return targetItem.subType;
	} else {
		return targetItem.id;
	}
}

function sortingMatchedItems(matchedItems, categoryName) {
	const matchedItemsLength = matchedItems.length;
	const sortedArray = [];
	for (let i = 0; i < matchedItemsLength; i++) {
		if (matchedItems[i].type === categoryName) {
			sortedArray.push(matchedItems[i]);
		} else {
			continue;
		}
	}
	return sortedArray;
}

function algorithmCategoryCallbacks(sortedArray, callback) {
	callbackFunction = callback(sortedArray); // callsback the respective sort function
	return callbackFunction;
}

function masterSortingAlgorithm(matchedItems) {
	const typeCategories = ["Weapon"];//, "Ammo", "Vest", "Bags"];
	const callbackCategories = [ sortWeapons];//, sortVest, sortAmmo];
	const stalkerItemNameArray = [];

	const typeLength = typeCategories.length;
	for (let i = 0; i < typeLength; i++) {
		let sortedArray = sortingMatchedItems(matchedItems, typeCategories[i]);
		//console.log(sortedArray); //prints out each category array
		let stalkerArray = algorithmCategoryCallbacks(sortedArray, callbackCategories[i]);
		let innawoodsLength = stalkerArray.length;
		for (let i = 0; i < innawoodsLength; i++) {
			stalkerItemNameArray.push(stalkerArray[i]);
		}
	}
	return stalkerItemNameArray;
}

function discoverAllTypes(arrayData) {
	const arrayLength = arrayData.length;
	const tempArray = [];
	for (let i = 0; i < arrayLength; i++) {
		tempArray.push(arrayData[i].type);
	}
	finalArray = [...new Set(tempArray)]; //Set creates an array with unique types
	// the "..." notation is used to iterate with an array to arguments(s).
	finalArray.sort();
	return finalArray;
}

function main(arrayData) {
	console.log(discoverAllTypes(arrayData));
	let playerItemArray = findCharacterLoadouts();
	matchedItems = matchSelectedItems(arrayData, playerItemArray);
	masterSortingAlgorithm(arrayData); // contains the whole unsorted array!!!
	//masterSortingAlgorithm(matchedItems);
	return console.log('MAIN_FUNCTION_COMPLETE');
}

// MAIN FUNCTION & OPERATIONS
const btn = document.querySelector('button');
btn.onclick = function() {
	biggestBlackHoleOfCallbacks();
}

//Sorting Algorithms: process an array to match stalker anomaly

function sortWeapons(guns) {
	const diagnosticArray = [];
	const nameArray = [];
	guns.forEach((i) => {
		if (i.name != "") {
			var wpn = regexGunsAlgorithms(i.name);
			var dia = i.name;
		} else{ var wpn = regexGunsAlgorithms(i.modelName); var dia = i.modelName;}
		nameArray.push(wpn);
		diagnosticArray.push(dia);
	});
	nameArray.sort();
	diagnosticArray.sort();
	console.log(diagnosticArray); //prints the unmodified array
	console.log(nameArray); //prints the modified FINAL array
	return nameArray; 
}

function regexGunsAlgorithms(wpn) {
	let allButParen = /(^.*?)(?=\s\()/g; //selects everything except parenthesis

	let lowerCaseWpn = wpn.toLowerCase();
	let selParen = /(\s\(.+\))/g; //selects everything inside parenthesis
	let noParenWpn = lowerCaseWpn.replace(selParen, '');

	let undesiredWords = /-1\b|loaded|empty|ii|sniper|mar\b|black|magpul|magazine|drum|bipod|paratrooper|stock|long|short|carbine|md\.|suppressor|sionics|&|camo|tape|extended|mag\b|melted|smg|standard|commando|tactical|franchi|a1|barrett|w\.|mount|gold|benelli|combat|government/g;
	let noUndesiredWords = noParenWpn.replace(undesiredWords, '');

	let illegalCharacters = /\\|"|-|^\s|\n\s|,|\s(?=\s)|\s$/g;
	let undesiredCharacters = noUndesiredWords.replace(illegalCharacters, '');

	//let illegalWhiteSpace = /^\s|\n\s|\s(?=\s)|\s$/g;
	//let undesiredWhiteSpace = undesiredCharacters.replace(illegalWhiteSpace, '');

	let wpnUnderScore = /\s/g;
	let wpnWhiteSpace = undesiredCharacters.replace(wpnUnderScore, "_");

	let finalWpn = wpnWhiteSpace;
	return finalWpn;
}























































































