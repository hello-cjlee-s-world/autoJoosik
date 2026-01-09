package org.cjlee.auto.autojoosik.domain.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Data
@Entity
@Table(name = "tb_schedule_info")
public class StockScoreEntity {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "stk_cd")
    private String stkCd;

    @Column(name = "score_total")
    private float scoreTotal;

    @Column(name = "score_fundamental")
    private float scoreFundamental;

    @Column(name = "score_momentum")
    private float scoreMomentum;

    @Column(name = "score_market")
    private float scoreMarket;

    @Column(name = "score_risk")
    private float scoreRisk;

    @Column(name = "last_price")
    private float lastPrice;

    @Column(name = "r1")
    private float r1;

    @Column(name = "r2")
    private float r2;

    @Column(name = "r3")
    private float r3;

    @Column(name = "volatility")
    private float volatility;

    @Column(name = "asof_tm")
    private LocalDateTime asofTm;

    @Type(JsonType.class)
    @Column(name = "meta")
    private Map<String, String> meta = new HashMap<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
