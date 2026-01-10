package org.cjlee.auto.autojoosik.common;

public class PagingInfoEntity {
	private Integer page_num;
	private Integer record_num;
	private Integer page_rowcount;
	private Integer page_totalcount;

	public Integer getPage_num() {
		return page_num;
	}

	public void setPage_num(Integer page_num) {
		this.page_num = page_num;
	}

	public Integer getRecord_num() {
		return record_num;
	}

	public void setRecord_num(Integer record_num) {
		this.record_num = record_num;
	}

	public Integer getPage_rowcount() {
		return page_rowcount;
	}

	public void setPage_rowcount(Integer page_rowcount) {
		this.page_rowcount = page_rowcount;
	}

	public Integer getPage_totalcount() {
		return page_totalcount;
	}

	public void setPage_totalcount(Integer page_totalcount) {
		this.page_totalcount = page_totalcount;
	}
}
