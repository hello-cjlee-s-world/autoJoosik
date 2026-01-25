package org.cjlee.auto.autojoosik.autojoosik.marketList;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.autojoosik.marketList.bean.StockInfoVO;
import org.cjlee.auto.autojoosik.domain.entity.StockInfoEntity;
import org.cjlee.auto.autojoosik.domain.entity.VirtualAssetDailyEntity;
import org.cjlee.auto.autojoosik.domain.repository.StockInfoRepository;
import org.cjlee.auto.autojoosik.domain.repository.VirtualAssetDailyRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MarketListService {
    @PersistenceContext
    private EntityManager em;

    private final StockInfoRepository stockInfoRepository;

    public List<StockInfoVO> getStockInfoList() {
        List<StockInfoEntity> entityList = stockInfoRepository.findAllByOrderByStkNmAsc();
        List<StockInfoVO> voList = new ArrayList<>();
        if(!entityList.isEmpty()) {
            for(StockInfoEntity entity : entityList){
                StockInfoVO vo = entity.toStockInfo();
                voList.add(vo);
            }
        }
        return voList;
    }

}

