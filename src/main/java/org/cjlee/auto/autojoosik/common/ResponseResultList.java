package org.cjlee.auto.autojoosik.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ResponseResultList<T> extends ResponseResult {
    private List body = null;

    public List<T> getBody() {
        List resultList = new ArrayList<T>();
        resultList.addAll(body);
//        for (int i=0;i<body.size();i++){
//            resultList.add(body.get(i));
//        }

        return resultList;
    }

    public void setBody(List<T> body) {
        List resultList = new ArrayList();
        if (body != null){
            resultList.addAll(body);
        }

        this.body = resultList;
    }

    public void setPagingInfo(PagingInfoVO vo) {
        if (this.getMeta() == null) {
            this.setMeta(new HashMap<String, Object>());
        }

        if (vo.getPageNum() == null){
            vo.setPageNum(1);
        }

        if (vo.getPageTotalCount() == null){
            vo.setPageTotalCount(0);
        }


        this.addMetaItem("pagingInfo", vo);
    }
}
