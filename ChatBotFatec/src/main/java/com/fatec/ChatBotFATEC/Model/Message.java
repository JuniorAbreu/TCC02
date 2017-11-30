package com.fatec.ChatBotFATEC.Model;

import java.util.Map;

import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;

public class Message {
	
	Map<String, Object> context;
	String workspaceId;
	String message;
	MessageRequest messageRequest;
	MessageResponse messageResponse;
	
	public Message(Map<String, Object> context, String workspaceId, String message, MessageRequest messageRequest,
			MessageResponse messageResponse) {
		super();
		this.context = context;
		this.workspaceId = workspaceId;
		this.message = message;
		this.messageRequest = messageRequest;
		this.messageResponse = messageResponse;
	}

	public MessageRequest getMessageRequest() {
		return messageRequest;
	}
	public void setMessageRequest(MessageRequest messageRequest) {
		this.messageRequest = messageRequest;
	}
	public MessageResponse getMessageResponse() {
		return messageResponse;
	}
	public void setMessageResponse(MessageResponse messageResponse) {
		this.messageResponse = messageResponse;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Map<String, Object> getContext() {
		return context;
	}
	public void setContext(Map<String, Object> context) {
		this.context = context;
	}
	public String getWorkspaceId() {
		return workspaceId;
	}
	public void setWorkspaceId(String workspaceId) {
		this.workspaceId = workspaceId;
	}
}
