package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_schedule_info")
public class TbVirtualAssetEntity {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "stk_cd")
    private String stkCd;

    @Column(name = "market")
    private String market;

    @Column(name = "position_side")
    private String positionSide;

    @Column(name = "qty")
    private int qty;

    @Column(name = "available_qty")
    private int availableQty;

    @Column(name = "avg_price")
    private int avgPrice;

    @Column(name = "last_price")
    private int lastPrice;

    @Column(name = "invested_amount")
    private int investedAmount;

    @Column(name = "eval_amount")
    private int evalAmount;

    @Column(name = "eval_pl")
    private int evalPl;

    @Column(name = "eval_pl_rate")
    private float evalPlRate;

    @Column(name = "today_buy_qty")
    private int todayBuyQty;

    @Column(name = "today_sell_qty")
    private int todaySellQty;

    @Column(name = "status")
    private String status;

    @Column(name = "last_eval_at")
    private LocalDateTime lastEvalAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "highest_price")
    private int highestPrice;
}
