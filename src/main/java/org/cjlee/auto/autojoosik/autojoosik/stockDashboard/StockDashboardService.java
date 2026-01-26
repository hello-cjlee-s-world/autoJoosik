package org.cjlee.auto.autojoosik.autojoosik.stockDashboard;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean.VirtualAccountVO;
import org.cjlee.auto.autojoosik.autojoosik.assetChart.bean.VirtualAssetDailyVO;
import org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean.VirtualAssetVO;
import org.cjlee.auto.autojoosik.domain.dto.VirtualAssetDTO;
import org.cjlee.auto.autojoosik.domain.entity.*;
import org.cjlee.auto.autojoosik.domain.repository.StockInfoRepository;
import org.cjlee.auto.autojoosik.domain.repository.VirtualAccountRepository;
import org.cjlee.auto.autojoosik.domain.repository.VirtualAssetDailyRepository;
import org.cjlee.auto.autojoosik.domain.repository.VirtualAssetRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockDashboardService {
    @PersistenceContext
    private EntityManager em;

    private final VirtualAssetRepository virtualAssetRepository;
    private final VirtualAssetDailyRepository virtualAssetDailyRepository;
    private final VirtualAccountRepository virtualAccountRepository;
    private final StockInfoRepository stockInfoRepository;

    public List<VirtualAssetVO> getAssets() {
      JPAQueryFactory queryFactory = new JPAQueryFactory(em);
      QStockInfoEntity stockInfoEntity = QStockInfoEntity.stockInfoEntity;
      QVirtualAssetEntity assetEntity = QVirtualAssetEntity.virtualAssetEntity;
      QTradeInfoLogEntity tradeInfoLogEntity = QTradeInfoLogEntity.tradeInfoLogEntity;

        List<VirtualAssetDTO> dtoList = queryFactory
                .select(Projections.fields(
                        VirtualAssetDTO.class,
                        assetEntity.assetId,
                        assetEntity.userId,
                        assetEntity.accountId,
                        assetEntity.stkCd,
                        assetEntity.market,
                        assetEntity.positionSide,
                        assetEntity.qty,
                        assetEntity.availableQty,
                        assetEntity.avgPrice,
                        assetEntity.lastPrice,
                        assetEntity.investedAmount,
                        assetEntity.evalAmount,
                        assetEntity.evalPl,
                        assetEntity.evalPlRate,
                        assetEntity.todayBuyQty,
                        assetEntity.todaySellQty,
                        assetEntity.status,
                        assetEntity.lastEvalAt,
                        assetEntity.createdAt,
                        assetEntity.updatedAt,
                        assetEntity.highestPrice,
                        stockInfoEntity.stkNm,
                        tradeInfoLogEntity.curPrc.as("curPrc") // DTO 필드명 맞춰 alias 권장
                ))
                .from(assetEntity)
                .leftJoin(stockInfoEntity).on(stockInfoEntity.stkCd.eq(assetEntity.stkCd))
                .leftJoin(tradeInfoLogEntity).on(
                        tradeInfoLogEntity.stkCd.eq(assetEntity.stkCd)
                                .and(tradeInfoLogEntity.tm.eq(
                                        JPAExpressions
                                                .select(tradeInfoLogEntity.tm.max())
                                                .from(tradeInfoLogEntity)
                                                .where(tradeInfoLogEntity.stkCd.eq(assetEntity.stkCd))
                                ))
                )
                .orderBy(assetEntity.assetId.asc())
                .fetch();

      List<VirtualAssetVO> voList = new ArrayList<>();
      for(VirtualAssetDTO dto : dtoList){
          VirtualAssetVO virtualAssetVO = dto.toVirtualAssetVO();
          voList.add(virtualAssetVO);
      }

      return voList;
    }

    public List<VirtualAssetDailyVO> getAssetDaily() {
        List<VirtualAssetDailyEntity> entityList = virtualAssetDailyRepository.findAll();
        List<VirtualAssetDailyVO> voList = new ArrayList<>();
        if(!entityList.isEmpty()) {
            for(VirtualAssetDailyEntity entity : entityList){
                VirtualAssetDailyVO vo = entity.toVirtualAssetDaily();
                voList.add(vo);
            }
        }
        return voList;
    }

    public VirtualAccountVO getAccount() {
        List<VirtualAccountEntity> entityList = virtualAccountRepository.findAll();
        VirtualAccountVO virtualAccountVO = new VirtualAccountVO();
        if(!entityList.isEmpty()) {
            virtualAccountVO = entityList.get(0).toVirtualAccountVO();
        }

        return virtualAccountVO;
    }

}

