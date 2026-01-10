package org.cjlee.auto.autojoosik.autojoosik.stockDashboard;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.autojoosik.stockDashboard.bean.VirtualAssetVO;
import org.cjlee.auto.autojoosik.common.CConstants;
import org.cjlee.auto.autojoosik.common.ResponseResult;
import org.cjlee.auto.autojoosik.common.ResponseResultList;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Controller
@RestController
@RequiredArgsConstructor
public class StockDashboardController {
    private final StockDashboardService stockDashboardService;

    @RequestMapping(value="/auto/assets", method = RequestMethod.GET)
    public ResponseResultList<VirtualAssetVO> getAssets() {
        ResponseResultList<VirtualAssetVO> result = new ResponseResultList<>();
        try {
            result.setBody(stockDashboardService.getAssets());
            result.setStatus(ResponseResult.RESULT_SUCCESS);
        } catch (Exception e) {
            result.setStatus(ResponseResult.RESULT_FAIL);
            log.error("Exception Message : {}", e.getMessage());
            log.error("Exception Location : {}", e.getStackTrace()[0]);
        }

        return result;
    }

}

