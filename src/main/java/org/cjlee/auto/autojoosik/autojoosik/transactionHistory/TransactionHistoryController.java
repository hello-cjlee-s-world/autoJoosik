package org.cjlee.auto.autojoosik.autojoosik.transactionHistory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cjlee.auto.autojoosik.common.ResponseResult;
import org.cjlee.auto.autojoosik.common.ResponseResultList;
import org.cjlee.auto.autojoosik.domain.dto.TransactionHistoryDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Controller
@RestController
@RequiredArgsConstructor
public class TransactionHistoryController {
    private final TransactionHistoryService transactionHistoryService;

    @RequestMapping(value="/auto/transactionHistory", method = RequestMethod.GET)
    public ResponseResultList<TransactionHistoryDTO> getAssetDailies() {
        ResponseResultList<TransactionHistoryDTO> result = new ResponseResultList<>();
        try {
            result.setBody(transactionHistoryService.getStockInfoList());
            result.setStatus(ResponseResult.RESULT_SUCCESS);
        } catch (Exception e) {
            result.setStatus(ResponseResult.RESULT_FAIL);
            log.error("Exception Message : {}", e.getMessage());
            log.error("Exception Location : {}", e.getStackTrace()[0]);
        }

        return result;
    }
}

