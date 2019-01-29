// ==UserScript==
// @name         TopDesk improv
// @namespace    https://github.com/sgezel/TOPdeskImprover/
// @version      0.3
// @description  Add much needed features to topdesk
// @author       Sandor Gezel
// @include      https://ergomedeom.topdesk.net/tas/secure/grid?gridpart=columns*
// @grant        none
// @require      http://code.jquery.com/jquery-2.2.4.min.js
// ==/UserScript==

(function() {
    'use strict';
    var finishedNoAnswer = "#A3FEBA";
    var answered = "#FFF7B7";
    var finishedNewAnswer = "#FFC8C8";
    var notificationColor = "#B3FF99";
    var user = "TOPdesk Server";
    $(document).ready(function(){
        $("#columnsscroll").append("<div id='notify' style='display:none; position: absolute; top:0; left:0; z-index:99999; border:1px solid #000; background-color:" + notificationColor + ";'></div>'");
        var finishedChildren = $("#\_gereed").children();
        var changedChildren = $("#\_uidwijzig").children();
        var nameChildren = $("#\_naam").children();
        var descChildren = $("#\_korteomschrijving").children();
        for(i = 0; i<changedChildren.length; i++)
        {
            if($(changedChildren[i]).text() == user)
            {
                $("[line='" + $(changedChildren[i]).attr("line") + "']").css("background-color", answered);
            }
        }
        for(var i = 0; i<finishedChildren.length; i++)
        {
            if($(finishedChildren[i]).text() == "Ja")
            {
                var color = finishedNoAnswer;
                for(var j = 0; j < changedChildren.length; j++)
                {
                    if($(changedChildren[i]).text() == user || $(changedChildren[i]).text() == "")
                    {
                        color = finishedNewAnswer;
                    }
                }
                $("[line='" + $(finishedChildren[i]).attr("line") + "']").css("background-color", color);
            }
        }
        for(var i = 0; i < nameChildren.length; i++)
        {
            $(nameChildren[i]).on("click", function(){
                var aux = document.createElement("input");
                aux.setAttribute("value", $(this).text() + " - " + $(descChildren[$(this).attr("line")]).text());
                document.body.appendChild(aux);
                aux.select();
                document.execCommand("copy");
                $("#notify").html("'" + aux.value + "' copied to clipboard");
                var position = $(this).position();
                $("#notify").css("left", position.left).css("top", position.top).show();
                setTimeout(function() {
                    $('#notify').fadeOut();
                }, 2000 );
                document.body.removeChild(aux);
            });
        }
    });
})();