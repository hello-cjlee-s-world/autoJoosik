package org.cjlee.auto.autojoosik.autojoosik.stockDashboard;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean.VirtualAssetVO;
import org.cjlee.auto.autojoosik.common.ResponseResult;
import org.cjlee.auto.autojoosik.common.ResponseResultList;
import org.cjlee.auto.autojoosik.domain.entity.VirtualAssetEntity;
import org.cjlee.auto.autojoosik.domain.repository.StockInfoRepository;
import org.cjlee.auto.autojoosik.domain.repository.VirtualAssetRepository;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockDashboardService {
    private final VirtualAssetRepository virtualAssetRepository;
    private final StockInfoRepository stockInfoRepository;

    public List<VirtualAssetVO> getAssets() {
        List<VirtualAssetEntity> entList = virtualAssetRepository.findAllByOrderByAssetId();
        List<VirtualAssetVO> voList = new ArrayList<>();
        if(entList!=null && !entList.isEmpty()){
          for(VirtualAssetEntity entity : entList){
              VirtualAssetVO virtualAssetVO = entity.toVirtualAssetVO();
              voList.add(virtualAssetVO);
          }
        }

        return voList;
    }
}

