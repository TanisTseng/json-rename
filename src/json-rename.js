
var JsonRename = function(){

	var changeBothParentAndChildren = function(jsonObject, key, translationTable){
		var translatedObject = renameKeys(jsonObject[key], translationTable[key][0]);
		if(translationTable[key][1] !== undefined){
			//console.log(jsonObject);
			jsonObject[translationTable[key][1]] = translatedObject;
			
			delete jsonObject[key];
		}
		return jsonObject;
	};

	var renameKeys = function(jsonObject, translationTable){

		var p;
		var translated = [];
		var clonedObject = JSON.parse(JSON.stringify(jsonObject));

		for(p in clonedObject){
			if(translationTable.hasOwnProperty(p)){
				if(Array.isArray(translationTable[p]) === true){
					clonedObject = changeBothParentAndChildren(clonedObject, p, translationTable);
				}
				else if(typeof translationTable[p] === 'object'){
					clonedObject[p] = renameKeys(clonedObject[p], translationTable[p]);
					if(clonedObject[p] === false){
						return false;
					}
				}
				else{
					if(translated.indexOf(translationTable[p]) >= 0){
						return false;
					}
					clonedObject[translationTable[p]] = clonedObject[p];
					translated.push(translationTable[p]);
					delete clonedObject[p];
				}
			}
		}
		return clonedObject;
	};

	return {
		renameKeys: renameKeys,
	};
};

module.exports = new JsonRename();

