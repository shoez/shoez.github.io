for (var layerGroupName in PSD) {
    // set all layerGroups to be global
    window[layerGroupName] = PSD[layerGroupName];
    //save original frame
    PSD[layerGroupName].originalFrame = window[layerGroupName].frame;
}

var STATE = null;

// global animation curve
 var animationCurve = 'ease-in';
 var animationTime = 200;

setupViews = function(){
	// visibility
	ProfilePanel.visible = false;
	OAuthOverlay.visible = false;
	AccountsSectionConnected.visible = false;
	AccountsSectionTeams.visible = false;
	SmallProfile2.visible = false;
	SmallProfile3.visible = false;
	SmallProfile4.visible = false;
	SidebarAvatarBackground.visible = false;
	ProfileMenuDropDown.visible = false;

	// opacity
	AuthoriseAccountButton.opacity = 0;
	AddAccountMessageCloseButton.opacity = 0;
	DropDownMenuButton.opacity = 0;

	//tooltips
	TickTooltip.visible = false;

	ProfilePanel.superView = DockedAccounts;
	ProfilePanel.x = AllAccountsPanel.width;


	// Move docked accounts out of sight
	DockedAccounts.x = -DockedAccounts.width;
	DockedAccounts.clip = true;
	// Sidebar.placeBefore(DockedAccounts);

	// start with All Accounts in the side panel minus the second account
	AllAccountsPanel.superView = DockedAccounts;
	AllAccountsPanel.y = 12;
	AllAccountsPanel.x = 0;
	AllAccountsPanel.visible = true;
}

setupInteractions = function(){

	// show OAuth window for new accounts
	ConnectTwitterAccountButton.on('click', function(e){
		OAuthOverlay.bringToFront();
		OAuthOverlay.visible = true;
	});

	// hide oAuth window
	AuthoriseAccountButton.on('click', function(e){
		OAuthOverlay.visible = false;
		showSecondAccount();
	});

	// Small Profile (Paul)
	SmallProfile.on('click', function(e){
		ProfilePanel.visible = true;
		showProfile1();
	});

	// Profile header back
	ProfileHeader.on('click', function(e){
		showAllAccounts();
	})

	// Add account message info box
	AddAccountMessageCloseButton.on('click', function(e){
		// remove banner with animation
		animate = AddAccountMessage.animate({
			properties:{ opacity: 0 },
			curve: animationCurve,
			time: animationTime
		})
	})

	// show Profile dropdown menu
	ShowingTimelineMenu.on('click', function(e){
		profileTimelineSelectorToggler()();
	})

	// hi / show sidebar
	SidebarAvatar.on("click", function(e){
		accountToggler()();
	})

	// hide show profile dropdown menu
	DropDownMenuButton.on('click', function(e){
		profileMenuToggler()();
	})

	// hover on account tick
	SelectedTick.on('mouseover', function(e){
		TickTooltip.visible = true;
	})
	SelectedTick.on('mouseout', function(e){
		TickTooltip.visible = false;
	})
}

showSecondAccount = function(){
	AccountsSectionConnected.visible = true;
	SmallProfile2.visible = true;
}

showProfile1 = function(){
	var shiftAmount = DockedAccounts.width;

	animate1 = AllAccountsPanel.animate({
		properties:{ x: (AllAccountsPanel.x -shiftAmount) },
		curve: animationCurve,
		time: animationTime
	})
	animate2 = ProfilePanel.animate({
		properties:{ x: (ProfilePanel.x -shiftAmount) },
		curve: animationCurve,
		time: animationTime
	})

	STATE = "Profile1";
}

showAllAccounts = function(){
	var shiftAmount = DockedAccounts.width;

	animate1 = AllAccountsPanel.animate({
		properties:{ x: (AllAccountsPanel.x + shiftAmount) },
		curve: animationCurve,
		time: animationTime
	})
	animate2 = ProfilePanel.animate({
		properties:{ x: (ProfilePanel.x + shiftAmount) },
		curve: animationCurve,
		time: animationTime
	})

	STATE = "AllAccounts";
}

// Accounts Menu
showAccountsMenu = function(e){
	// slide out from underneath the sidebar
	SidebarAvatarBackground.visible = true;
	animateColGroups = ColumnGroups.animate({
		properties:{ x:(ColumnGroups.x + DockedAccounts.width)},
		curve: animationCurve,
		time: animationTime
	})

	animateAccountPanel = DockedAccounts.animate({
		properties:{ x: 50 },
		curve: animationCurve,
		time: animationTime
	})
}

hideAccountsMenu = function(e){
	// slide back menu
	animateColGroups2 = ColumnGroups.animate({
		properties:{ x:ColumnGroups.originalFrame.x},
		curve: animationCurve,
		time: animationTime
	})

	animateAccountPanel2 = DockedAccounts.animate({
		properties:{ x:-DockedAccounts.width },
		curve: animationCurve,
		time: animationTime
	})

	animateAccountPanel2.on('end', function(e){
		if (STATE === "Profile1") {
			showAllAccounts();
		};

		SidebarAvatarBackground.visible = false;
	})
}

// ProfileTweetsDropDown Menu
showProfileTimelineMenu = function(e){
	// push down tweets to show menu
	animate = ProfileTweets.animate({
		properties:{ y: 333 },
		curve: animationCurve,
		time: 150
	})
}

hideProfileTimelineMenu = function(e){
	// push down tweets to show menu
	animate = ProfileTweets.animate({
		properties:{ y: ProfileTweets.originalFrame.y },
		curve: animationCurve,
		time: 150
	})
}

// Profile dropdown
showProfileDropDown = function(e){
	ProfileMenuDropDown.visible = true;
}

hideProfileDropDown = function(e){
	ProfileMenuDropDown.visible = false;
}


// togglers
accountToggler = utils.toggle(showAccountsMenu, hideAccountsMenu);
profileTimelineSelectorToggler = utils.toggle(showProfileTimelineMenu, hideProfileTimelineMenu);
profileMenuToggler = utils.toggle(showProfileDropDown, hideProfileDropDown);


// Start App
setupViews();
setupInteractions();
// setupHideShowAccountsMenu();
