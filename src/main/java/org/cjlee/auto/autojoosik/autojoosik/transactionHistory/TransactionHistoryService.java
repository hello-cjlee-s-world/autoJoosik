package org.cjlee.auto.autojoosik.autojoosik.transactionHistory;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.autojoosik.transactionHistory.bean.VirtualTradeLogVO;
import org.cjlee.auto.autojoosik.domain.dto.TransactionHistoryDTO;
import org.cjlee.auto.autojoosik.domain.entity.QStockInfoEntity;
import org.cjlee.auto.autojoosik.domain.entity.QVirtualTradeLogEntity;
import org.cjlee.auto.autojoosik.domain.entity.StockInfoEntity;
import org.cjlee.auto.autojoosik.domain.entity.VirtualTradeLogEntity;
import org.cjlee.auto.autojoosik.domain.repository.StockInfoRepository;
import org.cjlee.auto.autojoosik.domain.repository.VirtualTradeLogRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionHistoryService {
    @PersistenceContext
    private EntityManager em;

    public List<TransactionHistoryDTO> getStockInfoList() {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        QVirtualTradeLogEntity virtualTradeLogEntity = QVirtualTradeLogEntity.virtualTradeLogEntity;
        QStockInfoEntity stockInfoEntity = QStockInfoEntity.stockInfoEntity;

        List<TransactionHistoryDTO> dtoList = queryFactory
                .select(Projections.fields(
                        TransactionHistoryDTO.class,
                        virtualTradeLogEntity.tradeId,
                        virtualTradeLogEntity.orderId,
                        virtualTradeLogEntity.userId,
                        virtualTradeLogEntity.accountId,
                        virtualTradeLogEntity.stkCd,
                        virtualTradeLogEntity.market,
                        virtualTradeLogEntity.side,
                        virtualTradeLogEntity.filledQty,
                        virtualTradeLogEntity.filledPrice,
                        virtualTradeLogEntity.filledAmount,
                        virtualTradeLogEntity.feeAmount,
                        virtualTradeLogEntity.taxAmount,
                        virtualTradeLogEntity.createdAt,
                        stockInfoEntity.stkNm
                ))
                .from(virtualTradeLogEntity)
                .leftJoin(stockInfoEntity).on(virtualTradeLogEntity.stkCd.eq(stockInfoEntity.stkCd))
                .orderBy(virtualTradeLogEntity.createdAt.desc())
                .limit(10)
                .fetch();

        return dtoList;
    }

}

