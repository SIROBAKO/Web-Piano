package com.hako.web.config.socket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {



    
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// WebSocket 엔드포인트 등록
		registry.addEndpoint("/socket").setAllowedOrigins("https://sirobako.co.kr").withSockJS();

	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// 메시지 브로커 설정
		registry.enableSimpleBroker("/sub");
		registry.setApplicationDestinationPrefixes("/pub");
	}
	
	
}
