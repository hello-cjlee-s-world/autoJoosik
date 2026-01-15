package org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VirtualAccountVO {
    private Long accountId;
    private Long userId;
    private String accountName;
    private int cashBalance;
    private int totalInvested;
    private int totalEval;
    private int totalPl;
    private float totalPlRate;
    private int depositAmount;
    private int withdrawAmount;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
