package org.cjlee.auto.autojoosik.autojoosik.assetChart.bean;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VirtualAssetDailyVO {
    private long id;
    private int userId;
    private int accountId;
    private LocalDateTime baseDate;
    private float totalAssets;
    private float stockValue;
    private float cashBalance;
    private LocalDateTime createdAt;
}
