package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_schedule_info")
public class VirtualOrderEntity {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "order_type")
    private String orderType;

    @Column(name = "time_in_force")
    private String timeInForce;

    @Column(name = "price")
    private int price;

    @Column(name = "qty")
    private int qty;

    @Column(name = "filled_qty")
    private int filledQty;

    @Column(name = "remaining_qty")
    private int remainingQty;

    @Column(name = "status")
    private String status;

    @Column(name = "client_order_id")
    private String clientOrderId;

    @Column(name = "reason")
    private String reason;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
