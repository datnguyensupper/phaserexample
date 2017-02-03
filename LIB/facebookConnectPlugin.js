var facebookConnectPlugin = {
    // set tint color for all object relate to the square
    login: function (permission,success,failure) {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
            }
            else {
                FB.login();
            }
        });
    },
    showDialog: function(options, success, failure){
        FB.ui(options,success);

        // example
        // FB.ui({method:'share',href:'https://developers.facebook.com/docs'},
        // function(response){});
    }
};

window.fbAsyncInit = function() {
    FB.init({
        appId      : '254723221616616',
        xfbml      : true,
        version    : 'v2.8'
    });
    // FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
