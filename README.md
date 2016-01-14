# json-rename
A utility to rename Javascript JSON object's key

# Motivation

This module is for renaming keys in a JSON object. It reads a JSON object and a
translation table, renaming all keys that matches in the table.

# Code Examples

A very simple example, which changes the key from 'Auckland' to 'Oakland'.
```js
	var translationTable = {
		'Auckland': 'Oakland',
	};

	var rawObject = {
		'Auckland': 'California'
	};
	var expectedObject = {
		'Oakland': 'California',
	};

	var translatedObject = jsonRename.renameKeys(rawObject, translationTable);
	expect(expectedObject).to.eql(translatedObject);

```

An a little complicated example, which changes the keys in both levels of the object
```js
	var translationTable = {
		'Japan':[{
			'Taipei County': 'New Taipei City'
		}, 'Taiwan'],
	};

	var rawObject = {
		'Japan': {
			'Taipei County': 'Xizhi'
		}
	};

	var expectedObject = {
		'Taiwan': {
			'New Taipei City': 'Xizhi'
		}
	};

	var translatedObject = jsonRename.renameKeys(rawObject, translationTable);
	expect(expectedObject).to.eql(translatedObject);
```
