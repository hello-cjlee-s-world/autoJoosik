package org.cjlee.auto.autojoosik.domain.dto;

import lombok.Data;
import org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean.VirtualAssetVO;

import java.time.LocalDateTime;

@Data
public class VirtualAssetDTO {
    //virtual asset
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
    private Integer evalAmount;
    private Integer evalPl;
    private Float evalPlRate;
    private int todayBuyQty;
    private int todaySellQty;
    private String status;
    private LocalDateTime lastEvalAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int highestPrice;

    //stock info
    private String stkNm;

    // trade info log
    private Long curPrc;

  public VirtualAssetVO toVirtualAssetVO () {
        VirtualAssetVO vo = new VirtualAssetVO();
        vo.setStkNm(this.getStkNm());
        vo.setAssetId(this.getAssetId());
        vo.setUserId(this.getUserId());
        vo.setAccountId(this.getAccountId());
        vo.setStkCd(this.getStkCd());
        vo.setMarket(this.getMarket());
        vo.setPositionSide(this.getPositionSide());
        vo.setQty(this.getQty());
        vo.setAvailableQty(this.getAvailableQty());
        vo.setAvgPrice(this.getAvgPrice());
        vo.setLastPrice(this.getLastPrice());
        vo.setInvestedAmount(this.getInvestedAmount());
        vo.setEvalAmount(this.getEvalAmount());
        vo.setEvalPl(this.getEvalPl());
        vo.setTodayBuyQty(this.getTodayBuyQty());
        vo.setTodaySellQty(this.getTodaySellQty());
        vo.setStatus(this.getStatus());
        vo.setLastEvalAt(this.getLastEvalAt());
        vo.setCreatedAt(this.getCreatedAt());
        vo.setUpdatedAt(this.getUpdatedAt());
        vo.setHighestPrice(this.getHighestPrice());
        vo.setCurPrc(this.getCurPrc());

        return vo;
    }
}
