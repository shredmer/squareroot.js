#!/usr/bin/env node

var fs = require('fs');
var UglifyJS = require("uglify-js");

var version = require("./version.json");

var baseUrl = "html/src/";
var outputUrl = "build/";

var updateVersion = function() {

	version.build++;
	version.date = new Date();

	var jsHeader = "/** DO NOT EDIT. Updated from version.json **/\nSQR.Version = ";

	fs.writeFileSync("./version.json", JSON.stringify(version));
	fs.writeFileSync(baseUrl  + "Version.js", jsHeader + JSON.stringify(version));

	console.log('[ Squareroot.js v' + version.version + ' build ' + version.build + ' ]');	
}

var walk = function(dir, filelist) {

	var files = fs.readdirSync(dir);
	var filelist = filelist || [];

	files.forEach(function(file) {
		if (fs.statSync(dir + file).isDirectory()) {
			filelist = walk(dir + file + '/', filelist);
		} else {
			filelist.push(dir + file);
		}
	});

	return filelist;
};

var minify = function(set) {

	var includes = [];

	for(var i = 0; i < set.length; i++) {
		includes.push(set[i]);
	}

	var result = UglifyJS.minify(includes);

	return result.code;
}

var concat = function(set) {

	var concatFile = "";

	for(var i = 0; i < set.length; i++) {
		var f =  set[i];
		var name = f.substring(baseUrl.length);
		concatFile += "/* --- --- [" + name + "] --- --- */\n\n";
		concatFile += fs.readFileSync(f);
		concatFile += "\n\n";
	}

	return concatFile;
}

var createBucket = function(folder, files) {

	files = files || [];
	files = files.concat(walk(baseUrl + folder + '/'));

	var result = {};
	
	result.concat = concat(files);
	result.mini = minify(files);

	return result;
}

var saveBucket = function(bucket, fileBase) {

	var cf = outputUrl + fileBase + '.js';
	var mf = outputUrl + 'mini/' + fileBase + '.min.js';

	fs.writeFileSync(cf, bucket.concat);
	fs.writeFileSync(mf, bucket.mini);

	var cs = fs.statSync(cf).size;
	var ms = fs.statSync(mf).size;

	var cks = (cs / 1024) | 0;
	var mks = (ms / 1024) | 0;

	console.log('[ ' + cf + '\t' + cs + ' bytes\t' + cks + ' kb ]');
	console.log('[ ' + mf + '\t' + ms + ' bytes\t' + mks + ' kb ]');
}

var jsifyShaders = function(folder) {

	var set = walk(baseUrl + folder + '/');

	var concatFile = "SQR.GLSL = {\n";

	for(var i = 0; i < set.length; i++) {
		var f =  set[i];
		var name = f.substring((baseUrl + 'glsl/').length);
		concatFile += "\t/* --- --- [" + name + "] --- --- */\n";

		concatFile += '\t"' + name + '": "';

		var file = fs.readFileSync(f).toString().split('\n');

		for(var j = 0; j < file.length; j++) {
			var l = file[j];
			if(l.indexOf("//") > -1) l = l.substring(0, l.indexOf("//"));
			if(l.match(/^([\s\t]*)$/)) continue;
			concatFile += l + '\\n';
		}

		concatFile += '",\n';
	}

	concatFile += "};\n";

	var result = {};

	result.concat = concatFile;
	result.mini = UglifyJS.minify(concatFile, { fromString: true }).code;

	return result;
}

updateVersion();


var common = createBucket('common', [baseUrl + 'SQR.js', baseUrl + 'Version.js']);
saveBucket(common, 'sqr-common');

saveBucket(jsifyShaders('glsl'), 'sqr-glsl');
saveBucket(createBucket('math'), 'sqr-math');
saveBucket(createBucket('dev'), 'sqr-dev');
saveBucket(createBucket('extras'), 'sqr-extras');
saveBucket(createBucket('primitives'), 'sqr-primitives');
saveBucket(createBucket('two'), 'sqr-two');








