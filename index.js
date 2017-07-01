"use strict";


function parseString2Html(html) {

	var templateArray = html.split('<string2-template');


	// console.log(templateArray);



	var resultObject = {};
	for (var i = 0; i < templateArray.length;i++) {
		var str = (templateArray[i]||"").trim();
		if(str.length > 0){
			var index = str.indexOf('>');
			var ss1 = str.substring(0,index);
			var ss2 = str.substring(index+1,str.length);
			// console.log('\n')
			// console.log('=======')
			ss1 = ss1.replace(/id\s*=\s*/,'');
			ss1 = ss1.replace(/"/mg,'');
			ss1 = ss1.replace(/\\/mg,'');
			ss1 = ss1.trim();
			// console.log(ss1);
			// console.log('-------')

			ss2 = ss2.replace(/<\/string2-template>$/i,'');
			// console.log(ss2);
			// console.log('\n')

			resultObject[ss1] = ss2.trim();
		}
	}


	return resultObject;

}

function exportMultiTempalte(html) {

	var htmlObject = parseString2Html(html);

	var sds = JSON.stringify(htmlObject);

	var exports = 'module.exports = ' + sds +';';
	return exports;
}


module.exports = function(source) {
	var html = source;
	var exports = 'module.exports = ';

	html = html.replace(/\r|\n/g, '');
	html = html.replace(/^\s+/,'');
	html = html.replace(/\s+$/,'');
	html = html.replace(/\s+/gm,' ');

	if(/^<string2-template/.test(html) && /<\/string2-template>$/.test(html)){
		return exportMultiTempalte(html);
	}else{
		html = html.replace(/("|')/g, '\\$1');
	}

	return exports + '"' + html + '"';
};

