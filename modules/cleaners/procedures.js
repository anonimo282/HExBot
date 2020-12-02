const cleanersMod = $jSpaghetti.module("cleaners")
cleanersMod.config.debugMode = true

cleanersMod.procedure("goToOwnLogTab", function(shared, hooks){
	hooks.next()
	goToPage("/log")
})

cleanersMod.procedure("cleanTextAreaContent", function(data, hooks){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea.value.length > 0){
		data.isEmpty = false
		textArea.value = ""
		hooks.next()
		getDOMElement("input", "class", "btn btn-inverse", 0).click()
	} else {
		data.isEmpty = true
	}
	return null
})

cleanersMod.procedure("goToSoftwareTab", function(shared, hooks){
	hooks.next()
	goToPage("/software")
})

cleanersMod.procedure("goToTargetLogs", function(shared, hooks){
	if (!getDOMElement("textarea", "class", "logarea", 0) || (location.href.indexOf("/internet") == -1)){
		hooks.next()
		goToPage("/internet?view=logs")
	}
	return null
})


cleanersMod.procedure("cleanMyIpClues", function(shared, hooks){

	getMyIp(true, (myip) => {
		shared.myCluesFound = false
		var textArea = getDOMElement("textarea", "class", "logarea", 0)
		if (textArea){
			//var pattern = new RegExp("^.*" + getMyIp(true) + ".*$")

			const ipsSource = textArea.value + ' ' + controllers.bot.controlPanel.fieldsContent[FIELD_IPS_START_SEARCHING]
			var ips = []
			if(ipsSource){
				ips = extractIPsFromText(ipsSource, [myip])
			}
			console.log("ips found", ips)
			controllers.bot.controlPanel.fieldsContent[FIELD_IPS_START_SEARCHING] = ips.join()
			controllers.storage.set(controllers.bot)

			var pattern = new RegExp("^.*" + myip + ".*$")
			var textFiltered = removeLinesFromText(textArea.value, pattern)
			if (textArea.value != textFiltered){
				shared.myCluesFound = true
				textArea.value = textFiltered
			}
			//return true
			hooks.next(true)
		} else {
			//return false
			hooks.next(false)
		}
	})

})

cleanersMod.procedure("isThereProgressBar", function(){
	var progressBar = getDOMElement("div", "role", "progressbar", 0)
	if (progressBar){
		return true
	} else {
		return false
	}
})

cleanersMod.procedure("submitLogs", function(shared, hooks){
	hooks.next()
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
	return null
}) 

cleanersMod.procedure("goToLoginPage", function(shared, hooks){
	hooks.next()
	goToPage("/internet?action=login")
})

cleanersMod.procedure("hackTargetBruteForce", function(shared, hooks){
	hooks.next()
	goToPage("/internet?action=hack&method=bf")
})

cleanersMod.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
		return true
	return null
})

cleanersMod.procedure("isAccessForbidden", function(){
	var errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
	var labels = ["You do not have the needed software to perform this action", "Vocẽ não tem o software necessário para realizar essa ação", "your cracker is not good enough", "seu cracker não é bom o suficiente"]
	if (errorContainer){
		if(strposOfArray(errorContainer.innerHTML, labels) >= 0)
		return true
	}
	return false
})

cleanersMod.procedure("signInTarget", function(shared, hooks){
	hooks.next()
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
	return null
})

cleanersMod.procedure("waitProgressBar", function(shared, hooks){
	var loop = setInterval(() => {
		const successContainer = getDOMElement("div", "class", "alert alert-success", 0)
		const errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
		//var progressBar = getDOMElement("div", "role", "progressbar", 0)
		if (successContainer || errorContainer) {
			clearInterval(loop)
			shared.cleanLogs = void 0;
			shared.isThereMessageError = false;
			if(errorContainer){
				shared.isThereMessageError = true;
				console.warn('ERROR MESSAGE')
			} else {
				console.warn('SUCCESS MESSAGE')
			}
			hooks.next()
		}
	}, 100)
})

cleanersMod.procedure("boi", function(shared, hooks){
	console.log($jSpaghetti);
})

cleanersMod.procedure("goToLoginPage", function(shared, hooks){
	if (location.href.indexOf("/internet?action=login") == -1){
		hooks.next()
		goToPage("/internet?action=login")
	}
	return null
})


