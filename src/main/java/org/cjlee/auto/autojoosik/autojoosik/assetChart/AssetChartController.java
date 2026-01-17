package org.cjlee.auto.autojoosik.autojoosik.assetChart;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.autojoosik.assetChart.bean.VirtualAssetDailyVO;
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
public class AssetChartController {
    private final AssetChartService assetChartService;

    @RequestMapping(value="/auto/assetDailies", method = RequestMethod.GET)
    public ResponseResultList<VirtualAssetDailyVO> getAssetDailies() {
        ResponseResultList<VirtualAssetDailyVO> result = new ResponseResultList<>();
        try {
            result.setBody(assetChartService.getAssetDaily());
            result.setStatus(ResponseResult.RESULT_SUCCESS);
        } catch (Exception e) {
            result.setStatus(ResponseResult.RESULT_FAIL);
            log.error("Exception Message : {}", e.getMessage());
            log.error("Exception Location : {}", e.getStackTrace()[0]);
        }

        return result;
    }
}

