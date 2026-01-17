package org.cjlee.auto.autojoosik.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.cjlee.auto.autojoosik.autojoosik.assetChart.bean.VirtualAssetDailyVO;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_virtual_asset_daily")
public class VirtualAssetDailyEntity implements Serializable {
    private static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "account_id")
    private int accountId;

    @Column(name = "base_date")
    private LocalDateTime baseDate;

    @Column(name = "total_assets")
    private float totalAssets;

    @Column(name = "stock_value")
    private float stockValue;

    @Column(name = "cash_balance")
    private float cashBalance;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public VirtualAssetDailyVO toVirtualAssetDaily () {
        VirtualAssetDailyVO vo = new VirtualAssetDailyVO();
        vo.setId(this.getId());
        vo.setUserId(this.getUserId());
        vo.setAccountId(this.getAccountId());
        vo.setBaseDate(this.getBaseDate());
        vo.setTotalAssets(this.getTotalAssets());
        vo.setStockValue(this.getStockValue());
        vo.setCashBalance(this.getCashBalance());
        vo.setCreatedAt(this.getCreatedAt());

        return vo;
    }
}