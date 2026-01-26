package org.cjlee.auto.autojoosik.autojoosik.transactionHistory.bean;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VirtualTradeLogVO {
    private Long tradeId;
    private Long orderId;
    private Long userId;
    private Long accountId;
    private String stkCd;
    private String market;
    private String side;
    private int filledQty;
    private int filledPrice;
    private int filledAmount;
    private float feeAmount;
    private float taxAmount;
    private LocalDateTime createdAt;
}
