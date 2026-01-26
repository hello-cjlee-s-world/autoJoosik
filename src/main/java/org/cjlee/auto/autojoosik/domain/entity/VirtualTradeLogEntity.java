package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.cjlee.auto.autojoosik.autojoosik.transactionHistory.bean.VirtualTradeLogVO;
import org.cjlee.auto.autojoosik.common.LocalDateTimePersistenceConverter;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_virtual_trade_log")
public class VirtualTradeLogEntity {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_id")
    private Long tradeId;

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "stk_cd")
    private String stkCd;

    @Column(name = "market")
    private String market;

    @Column(name = "side")
    private String side;

    @Column(name = "filled_qty")
    private int filledQty;

    @Column(name = "filled_price")
    private int filledPrice;

    @Column(name = "filled_amount")
    private int filledAmount;

    @Column(name = "fee_amount")
    private float feeAmount;

    @Column(name = "tax_amount")
    private float taxAmount;

    @Column(name = "created_at")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    private LocalDateTime createdAt;

    public VirtualTradeLogVO toVirtualTradeLog() {
        VirtualTradeLogVO vo = new VirtualTradeLogVO();
        vo.setTradeId(this.getTradeId());
        vo.setOrderId(this.getOrderId());
        vo.setUserId(this.getUserId());
        vo.setAccountId(this.getAccountId());
        vo.setStkCd(this.getStkCd());
        vo.setMarket(this.getMarket());
        vo.setSide(this.getSide());
        vo.setFilledQty(this.getFilledQty());
        vo.setFilledPrice(this.getFilledPrice());
        vo.setFilledAmount(this.getFilledAmount());
        vo.setFeeAmount(this.getFeeAmount());
        vo.setTaxAmount(this.getTaxAmount());
        vo.setCreatedAt(this.getCreatedAt());

        return vo;
    }
}
