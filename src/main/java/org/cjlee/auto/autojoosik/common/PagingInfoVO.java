package org.cjlee.auto.autojoosik.common;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.querydsl.core.QueryResults;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@JsonRootName(value="pagingInfo")
public class PagingInfoVO {
  public static Integer DEFAULT_PAGEROWCOUNT = 10;
  private Integer pageNum;
  private Long pageTotalCount;
  private Integer pageRowCount = DEFAULT_PAGEROWCOUNT;
  private Integer totalPageCount;

  public PagingInfoVO() {
    this.pageNum = 0;
    this.pageTotalCount = 0L;
  }

  public PagingInfoVO(List list) {
    if (list != null && list.size() > 0){
      PagingInfoEntity info = (PagingInfoEntity)list.get(0);
      if (info != null){
        this.pageNum = Integer.parseInt(info.getPage_num().toString());
        this.pageTotalCount = Long.parseLong(info.getPage_totalcount().toString());
      }

//            Object item = list.get(0);
//            Class<?> clazz = item.getClass();
//
//            Field pageNumField;
//            try {
//                pageNumField = clazz.getDeclaredField ("pageNum");
//                pageNumField.setAccessible(true);
//                Object pageNumValue = pageNumField.get(item);
//                this.pageNum = Integer.parseInt(pageNumValue.toString());
//            } catch (NoSuchFieldException e) {
//                this.pageNum = -1;
//            } catch (IllegalAccessException e) {
//                this.pageNum = -1;
//            }
//
//            Field PageTotalCountField;
//            try {
//                PageTotalCountField = clazz.getDeclaredField ("pageTotalCount");
//                PageTotalCountField.setAccessible(true);
//                Object PageTotalCountValue = PageTotalCountField.get(item);
//                this.pageTotalCount = Integer.parseInt(PageTotalCountValue.toString());
//            } catch (NoSuchFieldException e) {
//                this.pageTotalCount = -1;
//            } catch (IllegalAccessException e) {
//                this.pageTotalCount = -1;
//            }
    }
  }

  public PagingInfoVO(List list, int pageRowCount) {
    if (list != null && list.size() > 0){
      PagingInfoEntity info = (PagingInfoEntity)list.get(0);
      if (info != null){
        this.pageNum = Integer.parseInt(info.getPage_num().toString());
        this.pageTotalCount = Long.parseLong(info.getPage_totalcount().toString());
      }
      this.pageRowCount = pageRowCount;
      this.totalPageCount = 0;
    }
  }

  public PagingInfoVO(PageRequest pageRequest, QueryResults resultQuery) {
    if (pageRequest != null){
      this.pageNum = pageRequest.getPageNumber() + 1;
      this.pageRowCount = pageRequest.getPageSize();
      if (resultQuery != null){
        this.pageTotalCount = resultQuery.getTotal();
      }
      else{
        this.pageTotalCount = 0L;
      }

    }
  }

  public PagingInfoVO(PageRequest pageRequest, long pageTotalCount){
    if (pageRequest != null){
      this.pageNum = pageRequest.getPageNumber() + 1;
      this.pageRowCount = pageRequest.getPageSize();
      if (pageTotalCount != 0){
        this.pageTotalCount = pageTotalCount;
//        Long a = Integer.parseInt(pageTotalCount);
        Long a = pageTotalCount;
        Double b = Double.valueOf(pageRowCount);
        double c = (double) Math.ceil(a/b);
        this.totalPageCount = (int) Math.floor(c);
      }
      else{
        this.pageTotalCount = 0L;
      }

    }
  }

  public Integer getPageRowCount() {
    return pageRowCount;
  }

  public void setPageRowCount(int pageRowCount) {
    this.pageRowCount = pageRowCount;
  }

  public Integer getPageNum() {
    return pageNum;
  }

  public void setPageNum(int pageNum) {
    this.pageNum = pageNum;
  }

  public Long getPageTotalCount() {
    return pageTotalCount;
  }

  public void setPageTotalCount(long pageTotalCount) {
    this.pageTotalCount = pageTotalCount;
  }

  public Integer getTotalPageCount() {
    return totalPageCount;
  }

  public void setTotalPageCount(Integer totalPageCount) {
    this.totalPageCount = totalPageCount;
  }
}
