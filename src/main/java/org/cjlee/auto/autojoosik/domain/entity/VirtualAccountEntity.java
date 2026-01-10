package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_virtual_account")
public class VirtualAccountEntity {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "account_name")
    private String accountName;

    @Column(name = "cash_balance")
    private int cashBalance;

    @Column(name = "total_invested")
    private int totalInvested;

    @Column(name = "total_eval")
    private int totalEval;

    @Column(name = "total_pl")
    private int totalPl;

    @Column(name = "total_pl_rate")
    private float totalPlRate;

    @Column(name = "deposit_amount")
    private int depositAmount;

    @Column(name = "withdraw_amount")
    private int withdrawAmount;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
