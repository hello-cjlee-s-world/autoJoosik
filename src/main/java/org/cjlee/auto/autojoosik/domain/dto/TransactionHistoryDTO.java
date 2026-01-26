package org.cjlee.auto.autojoosik.domain.dto;

import lombok.Data;
import org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean.VirtualAssetVO;

import java.time.LocalDateTime;

@Data
public class TransactionHistoryDTO {
//  Virtual trade log
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

    //stock info
    private String stkNm;
}
