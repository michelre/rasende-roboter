function init() {
// Connect to the SocketIO server to retrieve ongoing games.
    socket = io.connect();
    socket.on('gamesList', function(data) {
        var ul = document.getElementById('lesParties');
        ul.innerHTML = '';
        for (p in data.gamesList) {
            var li = document.createElement('li');
            ul.appendChild(li);
            li.appendChild(document.createTextNode(data.gamesList[p]));
        }
    });
    socket.on('gamesList', function(data) {
        var select = document.getElementById('lesParties');
        select.innerHTML = '';
        for (p in data.gamesList) {
            var option = document.createElement('option');
            option.setAttribute("value", data.gamesList[p]);
            select.appendChild(option);
            option.appendChild(document.createTextNode(data.gamesList[p]));
        }
    });
    socket.emit('loginPage');
}


