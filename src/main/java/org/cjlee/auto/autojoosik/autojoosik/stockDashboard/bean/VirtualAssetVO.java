package org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VirtualAssetVO {
    private Long assetId;
    private Long userId;
    private Long accountId;
    private String stkCd;
    private String market;
    private String positionSide;
    private int qty;
    private int availableQty;
    private int avgPrice;
    private int lastPrice;
    private int investedAmount;
    private int evalAmount;
    private int evalPl;
    private float evalPlRate;
    private int todayBuyQty;
    private int todaySellQty;
    private String status;
    private LocalDateTime lastEvalAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int highestPrice;
}
