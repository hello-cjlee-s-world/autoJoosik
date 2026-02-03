package org.cjlee.auto.autojoosik.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "manager")
@Data
public class CProperties {
	private Jwt jwt;
    private Api api;
    private String fileTempRootPath;

	@Data
	public static class Jwt {
		private String accessHeader;
		private String refreshHeader;
		private Integer accessTimeoutMin;
		private Integer refreshTimeoutMin;
		private String secret;
	}
    @Data
    public static class Api {
        private String host;
        private String port;
    }
}
