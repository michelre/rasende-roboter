// var XHR = function(method, ad, params) {
// var xhr = new XMLHttpRequest();
// xhr.onload = params.onload || null;
// xhr.open(method, ad);
// if(method == 'POST') {xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');}
// var variables   = params.variables || null
// , str			= '';
// for(var i in variables) {
// str += i + '=' + encodeURIComponent( variables[i] ) + '&';
// }
// xhr.send( str );
// }

var solutions = null;

function init() {
    // Connect to the SocketIO server to retrieve ongoing games.
    socket = io.connect();
    socket.on('participants', function(data) {
        var ul = document.getElementById('lesParticipants');
        ul.innerHTML = '';
        for (p in data.participants) {
            var li = document.createElement('li');
            ul.appendChild(li);
            li.appendChild(document.createTextNode(data.participants[p]));
        }
    });
    socket.on('FinalCountDown', function(data) {
        var ms = data.FinalCountDown;
        console.log("FinalCountDown : " + ms);
    });
    socket.on('TerminateGame', function(data) {
        h1 = document.querySelector('body > header > h1');
        h1.innerHTML += 'GAME OVER';
    });
    socket.on('solutions', function(data) 
	{
		//Par Tarik: Gestion du SON & Restart & Block SVG at end...
        $('.info-win').show("slow");
        $('.info-win .winner-login').text(data.solutions[0].player);
		lanceSon("/sons/victoire.wav","","");
		$('#coupe').show("slow");
        //console.log("Solutions are :\n" + JSON.stringify(data.solutions));
		lanceSon("/sons/postVictoire.wav","","");
		$("svg").off("click");
		var blink = function() {
			$('#restart').animate({
				opacity: '0'
			}, function(){
				$(this).animate({
					opacity: '1'
				}, blink);
			});
		}
		blink();
    });
    socket.emit('identification', {login: document.getElementById('login').value
        , idGame: document.getElementById('idGame').value}
    );
}