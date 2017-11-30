package com.fatec.ChatBotFATEC.Controller;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fatec.ChatBotFATEC.DAO.ConnectionFactory;
import com.fatec.ChatBotFATEC.Model.Message;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;

@WebServlet(name="watsonServlet",urlPatterns="/watsonServlet")
public class WatsonBean extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	Message message= new Message(null,"b967dc58-725b-4c8d-a91c-2db840fdd2cb",null,null,null);
	ConnectionFactory connection=new ConnectionFactory();

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String question = req.getParameter("nome");
		MessageResponse response = getWatsonResponse(question);
		res.setContentType("text/plain");
		res.getWriter().println(response.toString());
	}

	public MessageResponse getWatsonResponse(String msg) {
		
		message.setMessageRequest(new MessageRequest.Builder().inputText(msg).context(message.getContext()).build());
		message.setMessageResponse(connection.connectToWatson(message.getWorkspaceId(), message.getMessageRequest()).execute());	
		message.setContext(message.getMessageResponse().getContext());;
		return message.getMessageResponse();

	}

}
