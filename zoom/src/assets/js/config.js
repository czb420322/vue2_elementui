
export default {
	_ctx_base= "<%- config.ctx_base %>",
	moduleConfig = {
		agent_server_url: "<%- config.http_base_agent %>",
		life_server_url: "<%- config.http_base_life %>",
		calculation_server_url: "<%- config.http_base_calculation %>",
		proposal_server_url: "<%- config.http_base_proposal %>",
		print_server_url: "<%- config.http_base_print %>",
		esp_server_url: "<%- config.http_base_esp %>",
	},

	config = {
	},
	filterConfigPage = {
		ctx_base: _ctx_base,
		page_http_base: "<%- config.http_base %>",
		check_oauth_url: "<%- config.http_check_url %>",
		access_nologin_page: [
			'/common/error.html',
			'/common/redirect.html',
			'/demo/',
			'/product/productList.html',
			'/proposal/showProposal.html',
			'/services/salesman/inviteFriends.html',
			'/training/businessCard/microBusinessCard.html',
			'/life/insure/sharedSignAll.html',
			'/life/insure/sharedInsurancePrompt.html',
			'/life/insure/sharedInsurancePolicy.html',
			'/life/insure/sharedInsuranceResult.html',
			'/life/policy/sharedPolicyReceipt.html',
			'/life/policy/sharedPolicyReceiptResult.html',
			'/home/home.html',
			'/pdfjs/'
		],
		access_only_third_page: [
			'/login/login.html',
			'/account/account.html'
		],

		access_system_type: [
			{ system_type: 'wx', params: { type: 'wx', system: 'jk', thirdType: 'wx', appId: '<%- config.appid_wx %>', agentId: '<%- config.agent_wx %>' } },
			{ system_type: 'alipay', params: { type: 'alipay', system: 'jk', thirdType: 'alipay', appId: '<%- config.appid_alipay %>', agentId: '' } },
			{ system_type: 'app', params: { type: 'app', system: 'jk', thirdType: '', appId: '', agentId: '' } },
			{ system_type: 'page', params: { type: 'page', system: 'jk', thirdType: '', appId: '', agentId: '' } }
		]
	}
}