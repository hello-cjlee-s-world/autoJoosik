package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_schedule_info")
public class TradeInfoLogEntity {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "tm")
    private LocalDateTime tm;

    @Column(name = "cur_prc")
    private int curPrc;

    @Column(name = "pred_pre")
    private int predPre;

    @Column(name = "pre_rt")
    private int preRt;

    @Column(name = "pri_sel_bid_unit")
    private int priSelBidUnit;

    @Column(name = "pri_buy_bid_unit")
    private int priBuyBidUnit;

    @Column(name = "cntr_trde_qty")
    private Long cntrTrdeQty;

    @Column(name = "sign")
    private String sign;

    @Column(name = "acc_trde_qty")
    private Long accTrdeQty;

    @Column(name = "acc_trde_prica")
    private int accTrdePrica;

    @Column(name = "cntr_str")
    private float cntrStr;

    @Column(name = "stex_tp")
    private String stexTp;

    @Column(name = "stk_cd")
    private String stkCd;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
