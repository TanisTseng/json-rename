/*jshint expr:true*/
var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var jsonRename = require('../src/json-rename.js');

describe('Test json-rename library', function(){

	var translationTable = {
		'Auckland': 'Oakland',
		'New Zealand':{
			'Canterbury': 'Otago',
		},
		'Japan':[{
			'Taipei County': 'New Taipei City'
		}, 'Taiwan'],
		'CPBL':{
			'Lamigo Monkeys': 'CT Brothers',
			'Sinon Bulls': 'Uni Lions',
		},
		'CPBL2':{
			'Lamigo Monkeys': 'CT Brothers',
			'Eda Rhinos': 'CT Brothers',
		}
	};

	it('should returns Oakland instead of Auckland', function(){
		var rawObject = {
			'Auckland': 'California'
		};
		var expectedObject = {
			'Oakland': 'California',
		};

		var translatedObject = jsonRename.renameKeys(rawObject, translationTable);
		expect(expectedObject).to.eql(translatedObject);
	});

	it('should returns an object which a child\'s key is changed', function(){
		var rawObject = {
			'New Zealand': {
				'Canterbury': 'Dunedin'
			}
		};

		var expectedObject = {
			'New Zealand': {
				'Otago': 'Dunedin'
			}
		};

		var translatedObject = jsonRename.renameKeys(rawObject, translationTable);
		expect(expectedObject).to.eql(translatedObject);

	});

	it('should returns an object which both parent and child\'s key are changed', function(){
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

	});

	it('should returns an object which children\'s key are changed', function(){
		var rawObject = {
			'CPBL': {
				'Lamigo Monkeys': 'Ngayaw Ake',
				'Sinon Bulls': 'OEO',
			}
		};

		var expectedObject = {
			'CPBL': {
				'CT Brothers': 'Ngayaw Ake',
				'Uni Lions': 'OEO',
			}
		};

		var translatedObject = jsonRename.renameKeys(rawObject, translationTable);
		expect(expectedObject).to.eql(translatedObject);
	});

	it('should returns fail if two objects changes to a same key', function(){
		var rawObject = {
			'CPBL2': {
				'Lamigo Monkeys': 'Ngayaw Ake',
				'Eda Rhinos': 'Cheng, Ta-Hong',
			}
		};

		var originalObject = {
			'CPBL2': {
				'Lamigo Monkeys': 'Ngayaw Ake',
				'Eda Rhinos': 'Cheng, Ta-Hong',
			}
		};

		var translatedObject = jsonRename.renameKeys(rawObject, translationTable);
		expect(translatedObject).to.be.false;
		expect(rawObject).to.eql(originalObject);
	});
});