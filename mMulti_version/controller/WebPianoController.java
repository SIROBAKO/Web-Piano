package com.hako.web.piano.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hako.web.piano.dto.MessageDTO;
import com.hako.web.piano.dto.PianoDTO;

@Controller
public class WebPianoController {


	private Logger LOG = LogManager.getLogger(WebPianoController.class);

	@MessageMapping("/web-piano")
	@SendTo("/sub/web-piano")
	@CrossOrigin
	public PianoDTO handlePiano(PianoDTO pianoDTO) {
		return pianoDTO;
	}

	@MessageMapping("/web-piano/message")
	@SendTo("/sub/web-piano/message")
	@CrossOrigin
	public MessageDTO handleMessage(MessageDTO messageDTO) {
		LOG.info("user_name : " + messageDTO.getUser_name() + ", message : " + messageDTO.getMessage());
		return messageDTO;
	}

}