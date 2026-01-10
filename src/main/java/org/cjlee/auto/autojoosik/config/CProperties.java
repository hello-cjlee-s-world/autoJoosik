package org.cjlee.auto.autojoosik.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "manager")
@Data
public class CProperties {
	private String tenantCd;
	private String portalCode;
	private String nodeId;
	private String mediaWallId;
	private String postImageRootPath;
	private String postImageRootUrl;
	private String bannerRootPath;
	private String bannerRootUrl;
	private String popupRootPath;
	private String popupRootUrl;
	private String sourceRootPath;
	private String attachRootPath;
	private String fileTempRootPath;
	private String fileTempRootUrl;
	private String playerVodRootUrl;
	private String playerSnakeimageRootUrl;
	private String liveUrlDefault;
	private String profileImageRootPath;
	private String profileImageRootUrl;
	private Jwt jwt;
	private KakaoMap kakaoMap;

	private String amqpUri;
	private String ffmpegFilePath;
	private String ffprobeFilePath;
	private String contentRootPath;
	private String contentRootUrl;
	private String podImageRootPath;
	private String podImageRootUrl;
	private String nodeImageRootPath;
	private String nodeImageRootUrl;
	private String defualtPostimagePath;
	private String defualtPostimageName;
	private String busshelterOutdoorVideoUrl;
	private String InfojectorAdminUrl;

	@Data
	public static class Jwt {
		private String accessHeader;
		private String refreshHeader;
		private Integer accessTimeoutMin;
		private Integer refreshTimeoutMin;
		private String secret;
	}

	@Data
	public static class KakaoMap {
		private String appKey;
	}
}
