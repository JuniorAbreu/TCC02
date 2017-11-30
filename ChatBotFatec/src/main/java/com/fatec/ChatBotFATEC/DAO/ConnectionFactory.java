package com.fatec.ChatBotFATEC.DAO;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;
import com.ibm.watson.developer_cloud.http.ServiceCall;

public class ConnectionFactory {
	
	ConversationService service = new ConversationService(ConversationService.VERSION_DATE_2016_07_11);
	
	public ConnectionFactory() {
		super();
		service.setUsernameAndPassword("5a42b20b-9d7a-40af-9b8f-847b7bddca12", "jkiNtWtqnxdI");
	}
	
	public ServiceCall<MessageResponse> connectToWatson(String workspaceId,MessageRequest messageRequest){
		return service.message(workspaceId, messageRequest);
	}

}
