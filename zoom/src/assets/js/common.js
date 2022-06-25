requirejs.config({
	baseUrl : '<%- project_ctx_base %>/public/js/lib',
	urlArgs: "<%- requirejs_version %>",
	paths : {
		base : '..',
		app : '../app',
		util : '../util',
		module : '../module',
		config : '../config',
		components: '../components',
	},
	shim : {
		'sm' : {
			deps : ['util/page-filter'],
			exports : '$'
		},
		'sm-select-picker' : {
			deps : [ 'sm' ],
			exports : '$'
		},
		'sm-date-picker' : {
			deps : [ 'sm' ],
			exports : '$'
		},
		'juicer' : {
			deps : [ 'sm' ],
			exports : 'juicer'
		}
	}
});
