package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean.VirtualAccountVO;
import org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean.VirtualAssetVO;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "tb_virtual_account")
public class VirtualAccountEntity implements Serializable {
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

    public VirtualAccountVO toVirtualAccountVO() {
        VirtualAccountVO vo = new VirtualAccountVO();
        vo.setAccountId(this.accountId);
        vo.setUserId(this.userId);
        vo.setAccountName(this.accountName);
        vo.setCashBalance(this.cashBalance);
        vo.setTotalInvested(this.totalInvested);
        vo.setTotalEval(this.totalEval);
        vo.setTotalPl(this.totalPl);
        vo.setTotalPlRate(this.totalPlRate);
        vo.setDepositAmount(this.depositAmount);
        vo.setWithdrawAmount(this.withdrawAmount);
        vo.setStatus(this.status);
        vo.setCreatedAt(this.createdAt);
        vo.setUpdatedAt(this.updatedAt);

        return vo;
    }
}
