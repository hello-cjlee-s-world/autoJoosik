package org.cjlee.auto.autojoosik.autojoosik.assetChart;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.autojoosik.assetChart.bean.VirtualAssetDailyVO;
import org.cjlee.auto.autojoosik.domain.entity.*;
import org.cjlee.auto.autojoosik.domain.repository.VirtualAssetDailyRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssetChartService {
    @PersistenceContext
    private EntityManager em;

    private final VirtualAssetDailyRepository virtualAssetDailyRepository;

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

}

