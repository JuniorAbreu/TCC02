var conversationId = "NewConversation";
var example;
var msg;

$(document).ready(function(){
	
	$( "#help" ).mouseover(function() {
		 document.getElementById("speech-bubble").style.display = "inline";
	});
	$( "#help" ).mouseleave(function() {
		 document.getElementById("speech-bubble").style.display = "none";
	});
	$('.chat_head').click(function(){
		$('.chat_body').slideToggle('slow');
		if($( '.chat_body' ).is( ".opened" )){
			alert("ok")
		}
	});
	$('.msg_head').click(function(){
		$('.msg_wrap').slideToggle('slow');
	});
	$('.close').click(function(){
		$('.msg_box').hide();
	});
	sendToWatsonConversation();
	
	$('textarea').keypress(
    function(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            
            msg = $(this).val();
			$(this).val('');
			if(msg !='')
			$('<div class="msg_b">'+msg+'</div>').fadeIn(900).insertBefore('.msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);			
			
			if(conversationId!=="NewConversation"){
			sendToWatsonConversation(msg);
			}else if(conversationId==="NewConversation"){
				sendToWatsonConversation(null);
			}
						
        }
    });	
	

});
function sendToWatsonConversation(msgData){
	 try
	    {
	        asyncRequest = new XMLHttpRequest();
	        asyncRequest.addEventListener("readystatechange", stateChange, false);
	        asyncRequest.open('GET', '/ChatBotFatec/watsonServlet?nome='+msgData+ "&conversationId="+ conversationId, true);    //   /Test is url to Servlet!
	        asyncRequest.send(null);
	        count++;
	    }
	    catch(exception)
	   {
	   }
} 

function stateChange(){
	if(asyncRequest.readyState == 4 && asyncRequest.status == 200){
		conversationId = "existent";
		var msgResponse = JSON.parse(asyncRequest.responseText).output.text;
		var node=JSON.parse(asyncRequest.responseText).output.nodes_visited;
		var feedbackNode="node_3_1489018288295";
		node.forEach(function(value){
			if(value===feedbackNode){
				$('<div id="feedbackMsg" class="msg_a"><p>'+'Essa era a resposta ideal? '+'</p> <p><button onclick="sendFeedback(this.id)"  id="like" class="button"><img title="2049-2600" src="images/like.png" style="height: 30px; width: 30px;"></button><button id="dislike" onclick="sendFeedback(this.id)" class="button" style="border-color:red;"><img title="2049-2600" src="images/dislike.png" style="height: 30px; width: 30px"></button></p></div>').fadeIn(900).insertBefore('.msg_push').slideDown();
				example=msg;
			}else{
				$('<div class="msg_a">'+msgResponse+'</div>').fadeIn(900).insertBefore('.msg_push').slideDown();
			}
		})

		$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
		$('#bodyContainer').scrollTop($('#bodyContainer')[0].scrollHeight);
    }
}
function sendFeedback(value){
	sendToWatsonConversation(value);
	$("#feedbackMsg").fadeOut(900);
}

function addIntent(intent) {
	
	if(intent!='Outros'){
		var request = jQuery.ajax({
			url : "https://conversationconnector.mybluemix.net/createexample?exampleText="+example+"&intentName="+intent,
			method : "GET",
			contentType : "application/json; charset=UTF-8",
			async : false,
		    headers: {
	
		        'Content-Type':'application/json',
		        'Access-Control-Allow-Origin': '*',
		        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		    },
		    httpNodeCors: { origin: "*", methods: ['GET','PUT','POST','DELETE'] }
		});
		request.done(function(data) {
		});
		request.fail(function(jqXHR, textStatus) {
			alert("erro")
		});
	}	
	sendToWatsonConversation('Resposta do usuário');	
}