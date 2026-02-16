package org.cjlee.auto.autojoosik.autojoosik.marketList;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.autojoosik.marketList.bean.StockInfoVO;
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
public class MarketListController {
    private final MarketListService marketListService;

    @RequestMapping(value="/marketList/stocks", method = RequestMethod.GET)
    public ResponseResultList<StockInfoVO> getAssetDailies() {
        ResponseResultList<StockInfoVO> result = new ResponseResultList<>();
        try {
            result.setBody(marketListService.getStockInfoList());
            result.setStatus(ResponseResult.RESULT_SUCCESS);
        } catch (Exception e) {
            result.setStatus(ResponseResult.RESULT_FAIL);
            log.error("Exception Message : {}", e.getMessage());
            log.error("Exception Location : {}", e.getStackTrace()[0]);
        }

        return result;
    }
}

