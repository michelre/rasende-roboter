function getData(url, callback) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function(data) {
        if (callback) {
            callback(data);
        }
    }).fail(function(jqXHR) {
        console.log("Error getData", jqXHR);
    });
}

function postPropostion(url, login, idGame, proposition, callback){
    var data = "login="+login+"&idGame="+idGame+"&proposition="+JSON.stringify(proposition);
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json", 
        data: data
    }).done(function(data){
        if(callback)
            callback(data);
    }).fail(function(jqXHR, status, textError){
        console.log("Error postProposition", jqXHR, textError);
    });
}

function postPartie(idPartie, login, callback){
    $.ajax({
        type:"POST",
        url: "/",
        data: "login="+login+"&idGame="+idPartie
    }).done(function(data){
        if(callback)
            callback();
    }).fail(function(){
        
    })
}